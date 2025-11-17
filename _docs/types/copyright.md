---
layout: docs
title: "Copyright Category - Event Types"
description: "Complete reference for intellectual property infringement types including DMCA, piracy, and trademark violations"
permalink: /docs/types/copyright/
---

# Copyright Category

Intellectual property violations including DMCA notices, trademark infringement, and various forms of digital piracy across P2P networks, cyberlockers, and streaming platforms.

## Field Legend

- 🟠 **Mandatory** - MUST be present in all valid reports
- 🟢 **Recommended** - SHOULD be included when information is available
- 🔵 **Optional** - MAY be included for additional context

---

## copyright

**Use Case**: General copyright infringement reports including DMCA takedown notices. Used by rights holders, content protection agencies, and legal teams to protect intellectual property.

<details class="sample-report" markdown="1">
<summary>
  <span class="sample-icon">{ }</span>
  <span class="sample-title">View Complete Sample</span>
  <svg class="expand-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M7 10l5 5 5-5z"/>
  </svg>
</summary>

```json
{
  "xarf_version": "4.0.0",                                                       // 🟠 Mandatory
  "report_id": "550e8400-e29b-41d4-a716-446655440000",                           // 🟠 Mandatory
  "timestamp": "2024-01-15T10:00:00Z",                                           // 🟠 Mandatory
  "reporter": {                                                                 // 🟠 Mandatory
    "org": "Copyright Protection Service",                                       // 🟠 Mandatory
    "contact": "dmca@copyright.example",                                         // 🟠 Mandatory
    "type": "manual"                                                            // 🟠 Mandatory
  },
  "source_identifier": "198.51.100.75",                                          // 🟠 Mandatory
  "class": "copyright",                                                          // 🟠 Mandatory
  "type": "copyright",                                                           // 🟠 Mandatory

  "source_port": 443,                                                            // 🟢 Recommended
  "evidence_source": "manual_analysis",                                          // 🟢 Recommended
  "evidence": [                                                                 // 🟢 Recommended
    {
      "content_type": "text/plain",                                              // 🟠 Mandatory
      "description": "DMCA notice documentation",                                // 🟢 Recommended
      "payload": "RE1DQSBub3RpY2UgZm9yIGNvcHlyaWdodGVkIGNvbnRlbnQ="             // 🟠 Mandatory
    }
  ],
  "confidence": 0.99,                                                            // 🔵 Optional

  "tags": ["dmca:notice", "content:movie"],                                      // 🔵 Optional
  "description": "Copyright infringement - unauthorized movie distribution"     // 🟢 Recommended
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/copyright-copyright.json" style="display:none">Schema</a>

</details>

---

## cyberlocker

**Use Case**: Reports of copyright infringement via file hosting services (Mega, Rapidgator, etc.). Used by anti-piracy organizations to track and remove infringing content from cloud storage platforms.

<details class="sample-report" markdown="1">
<summary>
  <span class="sample-icon">{ }</span>
  <span class="sample-title">View Complete Sample</span>
  <svg class="expand-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M7 10l5 5 5-5z"/>
  </svg>
</summary>

```json
{
  "xarf_version": "4.0.0",                                                       // 🟠 Mandatory
  "report_id": "550e8400-e29b-41d4-a716-446655440000",                           // 🟠 Mandatory
  "timestamp": "2024-01-15T11:00:00Z",                                           // 🟠 Mandatory
  "reporter": {                                                                 // 🟠 Mandatory
    "org": "Anti-Piracy Organization",                                           // 🟠 Mandatory
    "contact": "antipiracy@content.example",                                     // 🟠 Mandatory
    "type": "automated"                                                         // 🟠 Mandatory
  },
  "source_identifier": "203.0.113.100",                                          // 🟠 Mandatory
  "class": "copyright",                                                          // 🟠 Mandatory
  "type": "cyberlocker",                                                         // 🟠 Mandatory

  "source_port": 443,                                                            // 🟢 Recommended
  "evidence_source": "automated_scan",                                           // 🟢 Recommended
  "evidence": [                                                                 // 🟢 Recommended
    {
      "content_type": "text/html",                                               // 🟠 Mandatory
      "description": "File hosting page with copyrighted content",               // 🟢 Recommended
      "payload": "PGh0bWw+PGhlYWQ+PHRpdGxlPkRvd25sb2FkIEZpbGU8L3RpdGxlPjwvaGVhZD48L2h0bWw+"  // 🟠 Mandatory
    }
  ],
  "confidence": 0.94,                                                            // 🔵 Optional

  "tags": ["platform:mega", "content:software"],                                 // 🔵 Optional
  "description": "Pirated software hosted on Mega cyberlocker"                  // 🟢 Recommended
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/copyright-cyberlocker.json" style="display:none">Schema</a>

</details>

---

## link_site

**Use Case**: Reports of websites indexing and linking to pirated content without hosting it directly. Used to combat piracy aggregation sites and torrent index pages.

<details class="sample-report" markdown="1">
<summary>
  <span class="sample-icon">{ }</span>
  <span class="sample-title">View Complete Sample</span>
  <svg class="expand-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M7 10l5 5 5-5z"/>
  </svg>
</summary>

```json
{
  "xarf_version": "4.0.0",                                                       // 🟠 Mandatory
  "report_id": "550e8400-e29b-41d4-a716-446655440000",                           // 🟠 Mandatory
  "timestamp": "2024-01-15T12:00:00Z",                                           // 🟠 Mandatory
  "reporter": {                                                                 // 🟠 Mandatory
    "org": "Content Protection Agency",                                          // 🟠 Mandatory
    "contact": "protection@agency.example",                                      // 🟠 Mandatory
    "type": "automated"                                                         // 🟠 Mandatory
  },
  "source_identifier": "192.0.2.200",                                            // 🟠 Mandatory
  "class": "copyright",                                                          // 🟠 Mandatory
  "type": "link_site",                                                           // 🟠 Mandatory

  "source_port": 443,                                                            // 🟢 Recommended
  "evidence_source": "automated_crawler",                                        // 🟢 Recommended
  "evidence": [                                                                 // 🟢 Recommended
    {
      "content_type": "text/html",                                               // 🟠 Mandatory
      "description": "Torrent index page",                                       // 🟢 Recommended
      "payload": "PGRpdj48YT5Eb3dubG9hZCBUb3JyZW50PC9hPjwvZGl2Pg=="             // 🟠 Mandatory
    }
  ],
  "confidence": 0.92,                                                            // 🔵 Optional

  "tags": ["linksite:torrent", "category:movies"],                               // 🔵 Optional
  "description": "Torrent index site linking to pirated movies"                 // 🟢 Recommended
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/copyright-link-site.json" style="display:none">Schema</a>

</details>

---

## p2p

**Use Case**: Reports of peer-to-peer copyright infringement (BitTorrent, eDonkey, etc.). Used by monitoring organizations to track and report users sharing copyrighted content via P2P networks.

<details class="sample-report" markdown="1">
<summary>
  <span class="sample-icon">{ }</span>
  <span class="sample-title">View Complete Sample</span>
  <svg class="expand-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M7 10l5 5 5-5z"/>
  </svg>
</summary>

```json
{
  "xarf_version": "4.0.0",                                                       // 🟠 Mandatory
  "report_id": "550e8400-e29b-41d4-a716-446655440000",                           // 🟠 Mandatory
  "timestamp": "2024-01-15T14:00:00Z",                                           // 🟠 Mandatory
  "reporter": {                                                                 // 🟠 Mandatory
    "org": "P2P Monitoring Service",                                             // 🟠 Mandatory
    "contact": "p2p@monitoring.example",                                         // 🟠 Mandatory
    "type": "automated"                                                         // 🟠 Mandatory
  },
  "source_identifier": "198.51.100.88",                                          // 🟠 Mandatory
  "class": "copyright",                                                          // 🟠 Mandatory
  "type": "p2p",                                                                 // 🟠 Mandatory

  "source_port": 51413,                                                          // 🟢 Recommended
  "evidence_source": "automated_scan",                                           // 🟢 Recommended
  "evidence": [                                                                 // 🟢 Recommended
    {
      "content_type": "application/octet-stream",                                // 🟠 Mandatory
      "description": "BitTorrent peer connection evidence",                      // 🟢 Recommended
      "payload": "Qml0VG9ycmVudCBwcm90b2NvbCBoYW5kc2hha2U="                     // 🟠 Mandatory
    }
  ],
  "confidence": 0.97,                                                            // 🔵 Optional

  "tags": ["p2p:bittorrent", "content:movie"],                                   // 🔵 Optional
  "description": "BitTorrent sharing of copyrighted movie files"                // 🟢 Recommended
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/copyright-p2p.json" style="display:none">Schema</a>

</details>

---

## ugc_platform

**Use Case**: Reports of copyright infringement on user-generated content platforms (YouTube, TikTok, etc.). Used by rights holders to enforce DMCA takedowns on social media and video platforms.

<details class="sample-report" markdown="1">
<summary>
  <span class="sample-icon">{ }</span>
  <span class="sample-title">View Complete Sample</span>
  <svg class="expand-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M7 10l5 5 5-5z"/>
  </svg>
</summary>

```json
{
  "xarf_version": "4.0.0",                                                       // 🟠 Mandatory
  "report_id": "550e8400-e29b-41d4-a716-446655440000",                           // 🟠 Mandatory
  "timestamp": "2024-01-15T15:30:00Z",                                           // 🟠 Mandatory
  "reporter": {                                                                 // 🟠 Mandatory
    "org": "Music Rights Organization",                                          // 🟠 Mandatory
    "contact": "copyright@musicrights.example",                                  // 🟠 Mandatory
    "type": "manual"                                                            // 🟠 Mandatory
  },
  "source_identifier": "203.0.113.50",                                           // 🟠 Mandatory
  "class": "copyright",                                                          // 🟠 Mandatory
  "type": "ugc_platform",                                                        // 🟠 Mandatory

  "source_port": 443,                                                            // 🟢 Recommended
  "evidence_source": "manual_analysis",                                          // 🟢 Recommended
  "evidence": [                                                                 // 🟢 Recommended
    {
      "content_type": "text/plain",                                              // 🟠 Mandatory
      "description": "DMCA notice for platform content",                         // 🟢 Recommended
      "payload": "WW91VHViZSB2aWRlbyBJRDogYWJjMTIzNDU2Nzg5"                     // 🟠 Mandatory
    }
  ],
  "confidence": 0.98,                                                            // 🔵 Optional

  "tags": ["platform:youtube", "content:music"],                                 // 🔵 Optional
  "description": "Unauthorized music upload on YouTube"                         // 🟢 Recommended
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/copyright-ugc-platform.json" style="display:none">Schema</a>

</details>

---

## usenet

**Use Case**: Reports of copyright infringement via Usenet newsgroups. Used by anti-piracy organizations to track content distributed through binary newsgroup channels.

<details class="sample-report" markdown="1">
<summary>
  <span class="sample-icon">{ }</span>
  <span class="sample-title">View Complete Sample</span>
  <svg class="expand-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M7 10l5 5 5-5z"/>
  </svg>
</summary>

```json
{
  "xarf_version": "4.0.0",                                                       // 🟠 Mandatory
  "report_id": "550e8400-e29b-41d4-a716-446655440000",                           // 🟠 Mandatory
  "timestamp": "2024-01-15T17:00:00Z",                                           // 🟠 Mandatory
  "reporter": {                                                                 // 🟠 Mandatory
    "org": "Usenet Monitoring Service",                                          // 🟠 Mandatory
    "contact": "usenet@monitoring.example",                                      // 🟠 Mandatory
    "type": "automated"                                                         // 🟠 Mandatory
  },
  "source_identifier": "192.0.2.175",                                            // 🟠 Mandatory
  "class": "copyright",                                                          // 🟠 Mandatory
  "type": "usenet",                                                              // 🟠 Mandatory

  "source_port": 119,                                                            // 🟢 Recommended
  "evidence_source": "automated_scan",                                           // 🟢 Recommended
  "evidence": [                                                                 // 🟢 Recommended
    {
      "content_type": "text/plain",                                              // 🟠 Mandatory
      "description": "Usenet post metadata",                                     // 🟢 Recommended
      "payload": "YWx0LmJpbmFyaWVzLm1vdmllcyAtIGNvcHlyaWdodGVkIGNvbnRlbnQ="     // 🟠 Mandatory
    }
  ],
  "confidence": 0.91,                                                            // 🔵 Optional

  "tags": ["platform:usenet", "newsgroup:alt.binaries"],                         // 🔵 Optional
  "description": "Copyrighted content posted to Usenet binary newsgroup"        // 🟢 Recommended
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/copyright-usenet.json" style="display:none">Schema</a>

</details>

---

## Related Documentation

- [Common Fields Reference]({{ site.baseurl }}/docs/common-fields/) - Detailed documentation of core XARF fields
- [Schema Reference]({{ site.baseurl }}/docs/schemas/) - JSON Schema validation documentation
- [All Event Types]({{ site.baseurl }}/docs/types/) - Browse other categories
