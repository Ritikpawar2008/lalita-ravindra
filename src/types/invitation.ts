export type AnimationStage = 
  | 'idle'             // Initial view: full-screen lotus scene with 7 unlit diyas (1st.png), "कमळाला स्पर्श करा"
  | 'lotus-opening'    // Lotus blooms smoothly centered
  | 'lighting-diyas'   // 7 diyas illuminate sequentially in clockwise order
  | 'card-emerging'    // Card emerges from lotus center and smoothly expands to 100% full screen
  | 'cover-full'       // Full-screen olive-green cover (2nd.png) waiting indefinitely for user tap on "स्पर्श करून उघडा"
  | 'cover-ready'      // Alias for cover-full
  | 'curtain-opening'  // Ivory curtains slide open from center revealing Page 1
  | 'cover-opening'    // Compatibility alias
  | 'card-reveal'      // Compatibility alias
  | 'invitation-open'; // 3-page ceremonial invitation (3rd.png, 4th.png, 5th.png)

export interface FamilyMember {
  relation: string;
  name: string;
}

export interface VenueInfo {
  name: string;
  marathiName: string;
  address: string;
  marathiAddress: string;
  mapsUrl: string;
  embedUrl: string;
}

export interface InvitationData {
  instruction: string;
  page1: {
    topShlok?: string;
    shlokLine1: string;
    shlokLine2: string;
    greeting: string;
    announcementLine1: string;
    announcementLine2: string;
  };
  page2: {
    ceremonyTitle: string;
    brideSub?: string;
    brideTitle: string;
    brideParents: string;
    connector: string;
    groomTitle: string;
    groomParents: string;
    eventLine: string;
  };
  page3: {
    heading: string;
    familyMembers: FamilyMember[];
    blessingText: string;
  };
  venue?: VenueInfo;
}

// Backward compatibility alias if needed
export type InvitationContent = Record<string, string>;
