import { expect, test, type Locator, type Page } from '@playwright/test'

/**
 * A manual evidence-generation suite for revised assets, NOT an art approval.
 * Each case attaches three actual WebGL stage screenshots to the Playwright report.
 * Human reviewers must compare them with independent real-world references.
 */
const selections=[
  {slug:'wolf-form-study',title:'Wolf Form Study'},
  {slug:'zebra-form-study',title:'Zebra Form Study'},
  {slug:'match-basketball',title:'Match Basketball'},
  {slug:'tennis-racket',title:'Tennis Racket'},
  {slug:'chef-knife',title:'Chef Knife'},
  {slug:'oscilloscope',title:'Digital Oscilloscope'},
  {slug:'action-camera',title:'Action Camera'},
  {slug:'pneumatic-cylinder',title:'Pneumatic Cylinder'},
  {slug:'conveyor-module',title:'Conveyor Module'},
  {slug:'air-compressor',title:'Workshop Air Compressor'},
  {slug:'lathe-chuck',title:'Precision Lathe Chuck'},
  {slug:'otoscope',title:'Clinical Otoscope'},
  {slug:'thermal-printer',title:'Thermal Printer'},
  {slug:'magnetic-stirrer',title:'Magnetic Stirrer'},
  {slug:'sourdough-loaf',title:'Sourdough Loaf'},
  {slug:'performance-surfboard',title:'Performance Surfboard'},
  {slug:'network-router',title:'Network Router'},
  {slug:'mushroom-cluster',title:'Mushroom Cluster'},
  {slug:'glazed-bay',title:'Glazed Window Bay'},
  {slug:'brutalist-stair',title:'Brutalist Stair'},
  {slug:'aero-wheel',title:'Aero Wheel'},
  {slug:'pendant-cluster',title:'Pendant Cluster'},
  {slug:'artisan-bread-basket',title:'Artisan Bread Basket'},
  {slug:'desert-cactus',title:'Desert Cactus'},
  {slug:'monarch-butterfly',title:'Monarch Butterfly'},
  {slug:'water-lily',title:'Water Lily'},
] as const

/**
 * Browser evidence is valid only when a foreground subject appears. A mounted
 * WebGL canvas can be entirely blank for seconds while lazy models and their
 * environment resolve. The backdrop alone must not be mistaken for a render.
 * This is a blank-frame guard, NOT a measure of artistic fidelity.
 */
async function visibleForegroundPixels(page: Page, stage: Locator) {
  const capture = await stage.screenshot({ animations: 'disabled' })
  return page.evaluate(async (base64: string) => {
    const binary = atob(base64)
    const bytes = Uint8Array.from(binary, char => char.charCodeAt(0))
    const bitmap = await createImageBitmap(new Blob([bytes], { type: 'image/png' }))
    const probe = document.createElement('canvas')
    probe.width = 96
    probe.height = 48
    const ctx = probe.getContext('2d', { willReadFrequently: true })
    if (!ctx) throw new Error('Cannot inspect screenshot pixels')
    ctx.drawImage(bitmap, 0, 0, probe.width, probe.height)
    bitmap.close()
    const colors = ctx.getImageData(0, 0, probe.width, probe.height).data
    const background = (3 * probe.width + 3) * 4
    const r = colors[background], g = colors[background + 1], b = colors[background + 2]
    let foreground = 0
    // Exclude stage chrome and the bottom HUD. Use absolute color contrast,
    // avoiding a false pass from similarly colored background grid lines.
    for (let y = 9; y < 39; y += 1) for (let x = 17; x < 79; x += 1) {
      const i = (y * probe.width + x) * 4
      const delta = Math.abs(colors[i] - r) + Math.abs(colors[i + 1] - g) + Math.abs(colors[i + 2] - b)
      if (delta > 45) foreground += 1
    }
    return foreground
  }, capture.toString('base64'))
}

test.describe('revised catalog WebGL evidence',()=>{
  for(const asset of selections){
    test(asset.slug+' real scene renders at three orientations',async({page},testInfo)=>{
      test.skip(testInfo.project.name!=='desktop-chromium','Camera evidence is captured at the reference desktop viewport.')
      test.setTimeout(60_000)
      await page.emulateMedia({reducedMotion:'reduce'})
      const runtimeErrors:string[]=[]
      page.on('pageerror',error=>runtimeErrors.push(error.message))
      await page.goto('/assets/'+asset.slug)
      await expect(page.getByRole('heading',{name:asset.title,level:1})).toBeVisible()
      const stage=page.locator('.detail-stage')
      const canvas=stage.locator('.asset-canvas canvas')
      await expect(canvas).toBeVisible()
      const dimensions=await canvas.evaluate(element=>{
        const el=element as HTMLCanvasElement
        const gl=el.getContext('webgl2')
        return {width:el.width,height:el.height,contextAlive:!!gl&&!gl.isContextLost()}
      })
      expect(dimensions.contextAlive).toBe(true)
      expect(dimensions.width).toBeGreaterThan(200)
      await expect.poll(async()=>canvas.evaluate(element=>(element as HTMLCanvasElement).height),{timeout:15000}).toBeGreaterThan(200)
      const range=page.locator('label.playground-range').filter({hasText:'Y orientation'})
      const slider=range.locator('input[type="range"]')
      await expect.poll(() => visibleForegroundPixels(page, stage), {timeout:25000,intervals:[600,900,1200]}).toBeGreaterThan(50)
      await expect(slider).toBeAttached()
      for(const angle of [0,90,-45]){
        await slider.evaluate((element,next)=>{
          const input=element as HTMLInputElement
          const setter=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value')?.set
          if(!setter)throw new Error('Input value setter unavailable')
          setter.call(input,String(next))
          input.dispatchEvent(new Event('input',{bubbles:true}))
          input.dispatchEvent(new Event('change',{bubbles:true}))
        },angle)
        await expect(range.locator('output')).toContainText(String(angle))
        await expect.poll(() => visibleForegroundPixels(page, stage), {timeout:10000,intervals:[300,600,900]}).toBeGreaterThan(50)
        await expect(page.locator('.scene-error')).toHaveCount(0)
        await testInfo.attach(asset.slug+'-yaw-'+angle+'.png',{
          body:await stage.screenshot({animations:'disabled'}),
          contentType:'image/png'
        })
      }
      expect(runtimeErrors).toEqual([])
    })
  }
})
