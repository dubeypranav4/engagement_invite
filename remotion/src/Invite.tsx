import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadCormorant } from "@remotion/google-fonts/CormorantGaramond";
import { loadFont as loadJost } from "@remotion/google-fonts/Jost";
import { inviteConfig as C, palette as P } from "./config";

const { fontFamily: cormorant } = loadCormorant();
const { fontFamily: jost } = loadJost();

/** Fade + rise reveal helper, timed in seconds. */
const useReveal = (delaySec: number, riseSec = 0.9) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = delaySec * fps;
  const end = start + riseSec * fps;
  const opacity = interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame, [start, end], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return { opacity, transform: `translateY(${y}px)` };
};

const Rings: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dash = 170;
  const draw = (delaySec: number) =>
    interpolate(frame, [delaySec * fps, (delaySec + 1.4) * fps], [dash, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  return (
    <svg width={260} height={150} viewBox="0 0 120 70" style={{ marginBottom: 30 }}>
      <circle
        cx="46" cy="35" r="26"
        fill="none" stroke={P.gold} strokeWidth={2.4} strokeLinecap="round"
        strokeDasharray={dash} strokeDashoffset={draw(0)}
      />
      <circle
        cx="74" cy="35" r="26"
        fill="none" stroke={P.gold} strokeWidth={2.4} strokeLinecap="round"
        strokeDasharray={dash} strokeDashoffset={draw(0.5)}
      />
    </svg>
  );
};

export const Invite: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eyebrow = useReveal(1.6);
  const names = useReveal(1.95, 1);
  const invite = useReveal(3.3);
  const details = useReveal(3.9);
  const venue = useReveal(4.3);
  const closing = useReveal(4.9);

  const dividerWidth = interpolate(
    frame,
    [2.9 * fps, 3.7 * fps],
    [0, 64],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: P.ivory,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 80,
      }}
    >
      {/* soft glow */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(201,169,97,0.12), transparent 55%)",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Rings />

        <div
          style={{
            fontFamily: jost,
            fontWeight: 400,
            fontSize: 26,
            letterSpacing: "0.28em",
            color: P.rose,
            marginBottom: 28,
            ...eyebrow,
          }}
        >
          {C.eyebrow}
        </div>

        <div
          style={{
            fontFamily: cormorant,
            fontWeight: 500,
            fontSize: 120,
            lineHeight: 1.08,
            color: P.charcoal,
            ...names,
          }}
        >
          {C.nameLeft}
          <span style={{ fontStyle: "italic", color: P.rose, fontSize: "0.7em", padding: "0 14px" }}>
            &amp;
          </span>
          {C.nameRight}
        </div>

        <div
          style={{
            width: dividerWidth,
            height: 2,
            background: P.gold,
            margin: "44px 0",
          }}
        />

        <div
          style={{
            fontFamily: jost,
            fontWeight: 300,
            fontSize: 34,
            lineHeight: 1.6,
            color: P.charcoal,
            maxWidth: 760,
            marginBottom: 44,
            ...invite,
          }}
        >
          {C.inviteLine}
        </div>

        <div style={{ fontFamily: jost, ...details }}>
          <div style={{ fontSize: 46, fontWeight: 500, color: P.charcoal, letterSpacing: "0.04em", marginBottom: 12 }}>
            {C.date}
          </div>
          <div style={{ fontSize: 30, fontWeight: 300, color: P.muted, letterSpacing: "0.02em" }}>
            {C.time}
          </div>
        </div>

        <div style={{ fontFamily: jost, marginTop: 22, ...venue }}>
          <div style={{ fontSize: 34, fontWeight: 400, color: P.charcoal }}>{C.venueName}</div>
          <div style={{ fontSize: 24, fontWeight: 300, color: P.muted, marginTop: 8, maxWidth: 700 }}>
            {C.venueAddress}
          </div>
        </div>

        <div
          style={{
            fontFamily: cormorant,
            fontStyle: "italic",
            fontSize: 38,
            color: P.rose,
            marginTop: 56,
            ...closing,
          }}
        >
          {C.closing}
        </div>
      </div>
    </AbsoluteFill>
  );
};
