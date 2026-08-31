# Engagement Invite — Video (Remotion)

A video version of the engagement invitation (the interactive HTML page lives in
the repo root at `../index.html`). This renders the same animation to an MP4 for
sharing on WhatsApp / Instagram / status.

## Setup

```bash
cd remotion
npm install
```

## Preview in the studio

```bash
npm start
```

Opens the Remotion Studio in your browser to scrub the timeline live.

## Render the MP4

```bash
npm run build      # -> out/invite.mp4
```

Output is a 1080×1920 (vertical) 9-second video at 30fps.

## Configure

Edit `src/config.ts` — names, date, time, venue, and the closing line all live
there, mirroring the `CONFIG` block in `../index.html`.

To change the video dimensions or duration, edit `src/Root.tsx`.
