import { expect, test } from '@playwright/test'

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
] as const

test.describe('revised catalog WebGL evidence',()=>{
  for(const asset of selections){
    test(asset.slug+' real scene renders at three orientations',async({page},testInfo)=>{
      test.skip(testInfo.project.name!=='desktop-chromium','Camera evidence is captured at the reference desktop viewport.')
      await page.emulateMedia({reducedMotion:'reduce'})
      const runtimeErrors:string[]=[]
      page.on('pageerror',error=>runtimeErrors.push(error.message))
      await page.goto('/assets/'+asset.slug)
      await expect(page.getByRole('heading',{name:asset.title,level:1})).toBeVisible()
      const stage=page.locator('.detail-stage')
      const canvas=stage.locator('canvas.asset-canvas')
      await expect(canvas).toBeVisible()
      const dimensions=await canvas.evaluate(element=>{
        const el=element as HTMLCanvasElement
        const gl=el.getContext('webgl2')
        return {width:el.width,height:el.height,contextAlive:!!gl&&!gl.isContextLost()}
      })
      expect(dimensions.contextAlive).toBe(true)
      expect(dimensions.width).toBeGreaterThan(200)
      expect(dimensions.height).toBeGreaterThan(200)
      const range=page.locator('label.playground-range').filter({hasText:'Y orientation'})
      const slider=range.locator('input[type="range"]')
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
        await page.waitForTimeout(250)
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
