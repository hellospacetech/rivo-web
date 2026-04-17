# Onboarding Audio Scripts

Generate these with ElevenLabs (eleven_multilingual_v2 model).
Use a warm, conversational male voice. Not corporate, not robotic.

## Turkish (TR)

Rivo, senin yerine piyasaları takip ediyor. Her sabah yüzlerce kaynaktan gelen haberleri analiz ediyoruz, gürültüyü filtreliyoruz ve sana özel tek bir sesli brifing hazırlıyoruz. On iki dakika. Sade dilde. Kahvenin yanında ya da yolda dinle, gerisini unut. Ama herkesin risk algısı farklı. Temkinli biri için önemli olan, agresif bir yatırımcı için sıradan olabilir. Bu yüzden brifingini senin risk profiline göre kalibre ediyoruz. Rivo'yu şimdi indir, sabah sekizde ilk brifingini dinle.

## English (EN)

Rivo keeps track of the markets for you. Every morning, we analyze news from hundreds of sources, filter out the noise, and prepare one audio brief just for you. Twelve minutes. Plain language. Listen over coffee or on the commute, then forget the rest. But everyone perceives risk differently. What matters to a cautious investor might be ordinary for an aggressive one. That is why we calibrate your brief to your risk profile. Download Rivo now, and listen to your first brief tomorrow at eight.

## Post-generation

After generating mp3 files, create word-level alignment JSONs:
- Use ElevenLabs alignment endpoint or Whisper for word-level timestamps
- Format: `{ "words": [{ "word": "...", "start": 0.0, "end": 0.4 }], "duration": 35.0 }`
- Save to: `public/audio/onboarding-{en|tr}.mp3` and `public/audio/onboarding-{en|tr}-alignment.json`
