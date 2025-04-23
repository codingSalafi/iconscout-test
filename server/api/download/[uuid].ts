// server/api/download/[uuid].ts
import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  // 1️⃣ Grab the path‐param
  const { uuid } = event.context.params!
  // 2️⃣ Read the JSON body, expecting { format: 'lottie' } or 'dotlottie'
  const { format } = await readBody<{ format: string }>(event)

  // 3️⃣ Pull in your public & private keys
  const config = useRuntimeConfig()
  const clientId     = String(config.public.iconScoutId)
  const clientSecret = String(config.private.clientSecret)

  // 4️⃣ Sanity‐check
  if (!clientId || !clientSecret) {
    console.error('[download api] Missing clientId or clientSecret:', {
      clientId,
      clientSecret
    })
    throw createError({ statusCode: 500, statusMessage: 'Server misconfigured' })
  }
  

  try {
    // 5️⃣ POST to IconScout
    const icoResp: any = await $fetch(
      `https://api.iconscout.com/v3/items/${uuid}/api-download`,
      {
        method:  'POST',
        headers: {
          'Client-ID':     clientId,
          'Client-Secret': clientSecret,
          'Content-Type':  'application/json'
        },
        body: { format }
      }
    )

    // 6️⃣ Return only the URL back to the client
    return { url: icoResp.response.download.url }
  } catch (err: any) {
    // 7️⃣ Log the full error & rethrow so Nitro will return 500
    console.error('[download api] error calling iconscout:', err)
    throw createError({
      statusCode: err.statusCode || 502,
      statusMessage: err.statusMessage || 'Failed to fetch download URL'
    })
  }
})
