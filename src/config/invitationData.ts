import type { InvitationData } from '../types/invitation';

export const invitationData: InvitationData = {
  instruction: "कमळाला स्पर्श करा",
  page1: {
    topShlok: "॥ श्री गणेशाय नमः ॥",
    shlokLine1: "॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ॥",
    shlokLine2: "॥ निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥",
    greeting: "सप्रेम नमस्कार",
    announcementLine1: "देवांचे कृपेने आणि कुटुंबाच्या आशीर्वादाने",
    announcementLine2: "एक सुंदर नातं जोडले जात आहे ."
  },
  page2: {
    ceremonyTitle: "साखरपुडा सोहळा",
    brideSub: "आमची लाडकी",
    brideTitle: "ची.सौ.कां. ललिता",
    brideParents: "सौ. उषा व श्री संतोष बाळू पवार यांची सुकन्या",
    connector: "आणि",
    groomTitle: "ची. रवींद्र",
    groomParents: "सौ. अरुणा व श्री नंदू रामभाऊ आहिरे यांचे सुपुत्र",
    eventLine: "यांचा साखरपुडा सोहळा आयोजित केला आहे"
  },
  page3: {
    heading: "॥ निमंत्रण ॥",
    familyMembers: [
      { relation: "अजोबा", name: "श्री. बाळू चिंधा पवार" },
      { relation: "आजी", name: "सौ. सुमन बाळू पवार" },
      { relation: "वडील", name: "श्री. संतोष बाळू पवार" },
      { relation: "आई", name: "सौ. उषा संतोष पवार" },
      { relation: "काका", name: "श्री. बबलू बाळू पवार" },
      { relation: "काकी", name: "सौ. पुजा बबलू पवार" },
      { relation: "भाऊ", name: "चि. रितिक संतोष पवार" },
      { relation: "भाऊ", name: "चि. मयूर बबलू पवार" },
      { relation: "बहीण", name: "कु. तेजस्विनी बबलू पवार" }
    ],
    blessingText: "आपण सहकुटुंब उपस्थित राहून वधू-वरास शुभाशीर्वाद द्यावेत हीच नम्र विनंती."
  },
  venue: {
    name: "Krushna Lawns",
    marathiName: "कृष्णा लॉन्स",
    address: "GGVF+FV4, Motibag naka, Sangameshwar, Malegaon, Maharashtra 423203",
    marathiAddress: "GGVF+FV4, मोतीबाग नाका, संगमेश्वर, मालेगाव, महाराष्ट्र ४२३२०३",
    mapsUrl: "https://maps.app.goo.gl/zydi4GQYoas6XTrv7",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2678.112104459921!2d74.5236223!3d20.5443239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bde99bd3327bbfb%3A0x428622d8186def61!2sKrushna%20Lawns!5e0!3m2!1smr!2sin!4v1700000000000!5m2!1smr!2sin"
  }
};

// Backward-compatible alias for any existing imports
export const invitationContent = {
  instruction: invitationData.instruction,
  shloka: invitationData.page1.shlokLine1,
  greeting: invitationData.page1.greeting,
  family: "पवार आणि आहिरे परिवार",
  bride: invitationData.page2.brideTitle,
  connector: invitationData.page2.connector,
  groom: invitationData.page2.groomTitle,
  ceremonyText: invitationData.page2.eventLine
};
