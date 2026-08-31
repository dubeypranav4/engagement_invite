import React from "react";
import { Composition } from "remotion";
import { Invite } from "./Invite";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="EngagementInvite"
      component={Invite}
      durationInFrames={270}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
