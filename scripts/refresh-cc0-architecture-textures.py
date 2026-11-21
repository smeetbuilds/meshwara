#!/usr/bin/env python3
"""Regenerate the pinned CC0 architectural PBR maps. Requires Pillow.
Web builds use committed maps and verify local SHA; no network required.
Upstream source files must match the recorded original MD5 before conversion.
"""
from pathlib import Path
import hashlib
import io
import json
import urllib.request
from PIL import Image, features

ROOT = Path(__file__).resolve().parent.parent
PIN = ROOT / 'src/data/cc0ArchitectureTextures.json'
SETS = {
    'plaster': 'plastered_wall',
    'brick': 'brick_wall_07',
    'oak': 'oak_wood_planks',
    'concrete': 'concrete_floor'
}
TYPES = {
    'color': ('Diffuse', 'jpg', 80),
    'normal': ('nor_gl', 'jpg', 83),
    'roughness': ('Rough', 'jpg', 76)
}
USER_AGENT = {'User-Agent': 'Meshvara-TextureProvenance/1.0'}
def load_json(url):
    with urllib.request.urlopen(urllib.request.Request(url,headers=USER_AGENT),timeout=32) as r: return json.load(r)
old = json.loads(PIN.read_text()) if PIN.exists() else {'sources':{}}
all_meta = load_json('https://api.polyhaven.com/assets?t=textures')
new = {'schemaVersion':1, 'license':'CC0-1.0', 'provider':'Poly Haven',
    'providerLicenseUrl':'https://polyhaven.com/license', 'encoding':'WEBP', 'resolution':1024,
    'sources':{}}
for short,id in SETS.items():
    info = all_meta[id]
    files = load_json(f'https://api.polyhaven.com/files/{id}')
    record = {'providerAssetId':id,'name':info.get('name',id),'authors':sorted(info.get('authors',{})),
              'sourceUrl':f'https://polyhaven.com/a/{id}','maps':{}}
    for kind,(type_key,ext,quality) in TYPES.items():
        upstream=files[type_key]['1k'][ext]
        original_md5=upstream['md5']
        if short in old['sources'] and kind in old['sources'][short]['maps']:
            pinned=old['sources'][short]['maps'][kind]['originalMd5']
            if pinned!=original_md5:raise ValueError(f'Upstream changed without review: {short} {kind}')
        with urllib.request.urlopen(urllib.request.Request(upstream['url'],headers=USER_AGENT),timeout=48) as stream: data=stream.read()
        md5=hashlib.md5(data).hexdigest()
        if md5!=original_md5:raise ValueError(f'Upstream file MD5 mismatch: {short} {kind}')
        image=Image.open(io.BytesIO(data)).convert('RGB')
        if image.width!=1024 or image.height!=1024:image=image.resize((1024,1024),Image.Resampling.LANCZOS)
        folder=ROOT/'public/textures/architecture'/short
        folder.mkdir(parents=True,exist_ok=True)
        target=folder/(kind+'.webp')
        image.save(target,format='WEBP',quality=quality,method=6)
        raw=target.read_bytes()
        entry={'originalUrl':upstream['url'],'originalMd5':md5,
            'outputPath':str(target.relative_to(ROOT)).replace('\\','/'),
            'sha256':hashlib.sha256(raw).hexdigest(),'bytes':len(raw),'width':1024,'height':1024}
        record['maps'][kind]=entry
        print(short,kind,round(len(raw)/1024),'KiB',flush=True)
    new['sources'][short]=record
PIN.parent.mkdir(parents=True,exist_ok=True)
PIN.write_text(json.dumps(new,indent=2,ensure_ascii=False)+'\n')
print('Generated',len(new['sources']),'verifiably CC0 material sets, Pillow WebP',features.version('webp'))
