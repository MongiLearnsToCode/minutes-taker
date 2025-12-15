# 📄 Product Requirements Document (PRD)  
**Product:** AI Meeting Notes MVP  
**Owner:** [Insert Startup Name Here]  
**Date:** [Today's Date]  

---

## 1. Problem Statement  
People hate taking notes during meetings. They either zone out, forget details, or waste time writing things down instead of participating. Existing tools are bloated, expensive, or not integrated into daily workflows.  

---

## 2. Goal  
Build a minimal, working product that automatically transcribes a recorded meeting and produces a clean, summarized version with action items. Deliver it fast, test with real users, and charge money as soon as possible.  

---

## 3. Core Features (MVP)  
1. **Audio Input**  
   - Upload audio file (mp3, wav).  
   - (Stretch goal: live Zoom/Meet integration).  

2. **Transcription**  
   - Generate text transcript from meeting audio using AI.  
   - Label speakers (basic "Speaker 1, Speaker 2" is acceptable).  

3. **Summarization**  
   - AI-generated summary of key points.  
   - Extract action items (bulleted list).  

4. **Export/Share**  
   - Copy to clipboard.  
   - Export as TXT/PDF.  

---

## 4. Out of Scope (for MVP)  
- Fancy formatting (slides, highlights, themes).  
- Multi-language translation.  
- Task manager integrations.  
- Real-time "live notes."  

---

## 5. User Flow  
1. User uploads meeting recording.  
2. App shows transcription progress bar.  
3. Transcript + summary + action items appear.  
4. User exports notes or copies them.  

---

## 6. Success Metrics  
- **Adoption:** At least 20 active users in the first month.  
- **Retention:** >50% of users come back for at least 3 meetings.  
- **Monetization:** 5 users willing to pay within 60 days.  

---

## 7. Tech Stack  
- **AI Services:**  
  - OpenAI Whisper → transcription  
  - GPT (4 or 4o-mini) → summarization + action items  

---

## 8. Risks  
- **Accuracy:** Transcription or summarization errors reduce trust.  
- **Audio Quality:** Background noise or accents may affect usability.  
- **Privacy/Security:** Users may be hesitant to upload sensitive recordings.  
- **Competition:** Existing tools (Otter.ai, Fireflies.ai, etc.) with established user bases.  

---

## 9. Design System

### Colors
```json
{
  "background": {
    "page": "#E8E8E8",
    "card": {
      "starter": "#FFFFFF",
      "professional": "#D4DCE8",
      "enterprise": "#F0F0F0"
    }
  },
  "text": {
    "primary": "#000000",
    "secondary": "#333333",
    "muted": "#666666"
  },
  "button": {
    "background": "#1A1A1A",
    "text": "#FFFFFF"
  },
  "checkmark": "#C4C4C4"
}
```

### Typography
```json
{
  "heading": {
    "main": {
      "fontSize": "64px",
      "fontWeight": "700",
      "lineHeight": "1.2"
    },
    "subtitle": {
      "fontSize": "18px",
      "fontWeight": "400",
      "lineHeight": "1.5"
    }
  },
  "card": {
    "label": {
      "fontSize": "16px",
      "fontWeight": "700",
      "textTransform": "uppercase",
      "letterSpacing": "0.5px"
    },
    "price": {
      "fontSize": "56px",
      "fontWeight": "700",
      "lineHeight": "1"
    },
    "priceUnit": {
      "fontSize": "24px",
      "fontWeight": "400"
    },
    "description": {
      "fontSize": "18px",
      "fontWeight": "400",
      "lineHeight": "1.5"
    },
    "feature": {
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "1.6"
    }
  },
  "button": {
    "fontSize": "16px",
    "fontWeight": "500"
  }
}
```

### Spacing
```json
{
  "cardPadding": "32px",
  "cardGap": "24px",
  "featureGap": "16px",
  "sectionGap": "48px"
}
```

### Border Radius
```json
{
  "card": "24px",
  "button": "28px"
}
```

### Layout
```json
{
  "maxWidth": "1200px",
  "gridColumns": 3,
  "gridGap": "32px"
}
```

### Components
```json
{
  "card": {
    "padding": "32px",
    "borderRadius": "24px",
    "boxShadow": "0 4px 12px rgba(0, 0, 0, 0.08)"
  },
  "button": {
    "height": "56px",
    "padding": "0 32px",
    "borderRadius": "28px",
    "width": "100%"
  },
  "checkmark": {
    "size": "20px",
    "marginRight": "12px"
  }
}
```

---

## 10. Pricing Structure

### Starter Plan
- **Price:** $0/month
- **Target:** Perfect For Small Teams
- **Features:**
  - 3 Projects
  - AI Applicant Screening
  - AI Recruiter

### Professional Plan
- **Price:** $99/month
- **Target:** Perfect For Growing Teams
- **Features:**
  - Unlimited Projects
  - AI Applicant Screening
  - AI Recruiter
  - Risk-Free Guarantee

### Enterprise Plan
- **Price:** Custom
- **Target:** For Large Organizations
- **Features:**
  - Unlimited Projects
  - AI Applicant Screening
  - Custom Skill Assessments
  - Custom AI Recruiter

---
