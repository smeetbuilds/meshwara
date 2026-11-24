import { expect, test, type Locator, type Page } from '@playwright/test'

const examples=['Mercury Fold','Glass Decanter','Chef Knife','Greyhound Study'] as const

async function foreground(page:Page,preview:Locator){
  const buffer=await preview.screenshot({animations:'disabled'})
  return page.evaluate(async (base64:string)=>{
    const bytes=Uint8Array.from(atob(base64),c=>c.charCodeAt(0))
    const bitmap=await createImageBitmap(new Blob([bytes],{type:'image/png'}))
    const probe=document.createElement('canvas')
    probe.width=64;probe.height=64
    const ctx=probe.getContext('2d',{willReadFrequently:true})
    if(!ctx)throw Error('Could not inspect preview')
    ctx.drawImage(bitmap,0,0,64,64);bitmap.close()
    const pixels=ctx.getImageData(0,0,64,64).data
    const bg=(11*64+5)*4
    let count=0
    for(let y=15;y<49;y++)for(let x=14;x<50;x++){
      const i=(y*64+x)*4
      const contrast=Math.abs(pixels[i]-pixels[bg])+Math.abs(pixels[i+1]-pixels[bg+1])+Math.abs(pixels[i+2]-pixels[bg+2])
      if(contrast>45)count++
    }
    return count
  },buffer.toString('base64'))
}

test.describe('compact catalog material preview',()=>{
  for(const name of examples){
    test(name+' renders in the compact card',async({page},testInfo)=>{
      test.skip(!['desktop-chromium','mobile-chromium'].includes(testInfo.project.name),'Reference Chromium desktop and mobile layouts')
      test.setTimeout(60_000)
      await page.emulateMedia({reducedMotion:'reduce'})
      const errors:string[]=[]
      page.on('pageerror',e=>errors.push(e.message))
      await page.goto('/assets/?q='+encodeURIComponent(name))
      const card=page.locator('.asset-card').filter({has:page.getByRole('heading',{name,exact:true})}).first()
      await expect(card).toBeVisible()
      await card.scrollIntoViewIfNeeded()
      const preview=card.locator('.asset-preview')
      const canvas=preview.locator('.asset-canvas canvas')
      await expect(canvas).toBeVisible({timeout:20000})
      await expect.poll(()=>canvas.evaluate(el=>{
        const c=el as HTMLCanvasElement
        const gl=c.getContext('webgl2')
        return c.width>100&&c.height>100&&!!gl&&!gl.isContextLost()
      }),{timeout:15000}).toBe(true)
      await expect.poll(()=>foreground(page,preview),{timeout:25000,intervals:[600,1000,1500]}).toBeGreaterThan(20)
      await expect(card.locator('.scene-error')).toHaveCount(0)
      await testInfo.attach(name.replaceAll(' ','-')+'.png',{body:await preview.screenshot({animations:'disabled'}),contentType:'image/png'})
      expect(errors).toEqual([])
    })
  }
})
