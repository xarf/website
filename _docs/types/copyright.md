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
  "xarf_version": "4.0.0",
  "report_id": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2024-01-15T10:00:00Z",
  "reporter": {
    "org": "Copyright Protection Service",
    "contact": "dmca@copyright.example",
    "type": "manual"
  },
  "source_identifier": "198.51.100.75",
  "class": "copyright",
  "type": "copyright",

  "source_port": 443,
  "evidence_source": "manual_analysis",
  "evidence": [
    {
      "content_type": "text/plain",
      "description": "DMCA notice documentation",
      "payload": "RE1DQSBub3RpY2UgZm9yIGNvcHlyaWdodGVkIGNvbnRlbnQ="
    }
  ],
  "confidence": 0.99,

  "tags": ["dmca:notice", "content:movie"],
  "description": "Copyright infringement - unauthorized movie distribution"
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
  "xarf_version": "4.0.0",
  "report_id": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2024-01-15T11:00:00Z",
  "reporter": {
    "org": "Anti-Piracy Organization",
    "contact": "antipiracy@content.example",
    "type": "automated"
  },
  "source_identifier": "203.0.113.100",
  "class": "copyright",
  "type": "cyberlocker",

  "source_port": 443,
  "evidence_source": "automated_scan",
  "evidence": [
    {
      "content_type": "text/html",
      "description": "File hosting page with copyrighted content",
      "payload": "PGh0bWw+PGhlYWQ+PHRpdGxlPkRvd25sb2FkIEZpbGU8L3RpdGxlPjwvaGVhZD48L2h0bWw+"
    }
  ],
  "confidence": 0.94,

  "tags": ["platform:mega", "content:software"],
  "description": "Pirated software hosted on Mega cyberlocker"
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
  "xarf_version": "4.0.0",
  "report_id": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2024-01-15T12:00:00Z",
  "reporter": {
    "org": "Content Protection Agency",
    "contact": "protection@agency.example",
    "type": "automated"
  },
  "source_identifier": "192.0.2.200",
  "class": "copyright",
  "type": "link_site",

  "source_port": 443,
  "evidence_source": "automated_crawler",
  "evidence": [
    {
      "content_type": "text/html",
      "description": "Torrent index page",
      "payload": "PGRpdj48YT5Eb3dubG9hZCBUb3JyZW50PC9hPjwvZGl2Pg=="
    }
  ],
  "confidence": 0.92,

  "tags": ["linksite:torrent", "category:movies"],
  "description": "Torrent index site linking to pirated movies"
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
  "xarf_version": "4.0.0",
  "report_id": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2024-01-15T14:00:00Z",
  "reporter": {
    "org": "P2P Monitoring Service",
    "contact": "p2p@monitoring.example",
    "type": "automated"
  },
  "source_identifier": "198.51.100.88",
  "class": "copyright",
  "type": "p2p",

  "source_port": 51413,
  "evidence_source": "automated_scan",
  "evidence": [
    {
      "content_type": "application/octet-stream",
      "description": "BitTorrent peer connection evidence",
      "payload": "Qml0VG9ycmVudCBwcm90b2NvbCBoYW5kc2hha2U="
    }
  ],
  "confidence": 0.97,

  "tags": ["p2p:bittorrent", "content:movie"],
  "description": "BitTorrent sharing of copyrighted movie files"
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
  "xarf_version": "4.0.0",
  "report_id": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2024-01-15T15:30:00Z",
  "reporter": {
    "org": "Music Rights Organization",
    "contact": "copyright@musicrights.example",
    "type": "manual"
  },
  "source_identifier": "203.0.113.50",
  "class": "copyright",
  "type": "ugc_platform",

  "source_port": 443,
  "evidence_source": "manual_analysis",
  "evidence": [
    {
      "content_type": "text/plain",
      "description": "DMCA notice for platform content",
      "payload": "WW91VHViZSB2aWRlbyBJRDogYWJjMTIzNDU2Nzg5"
    }
  ],
  "confidence": 0.98,

  "tags": ["platform:youtube", "content:music"],
  "description": "Unauthorized music upload on YouTube"
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
  "xarf_version": "4.0.0",
  "report_id": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2024-01-15T17:00:00Z",
  "reporter": {
    "org": "Usenet Monitoring Service",
    "contact": "usenet@monitoring.example",
    "type": "automated"
  },
  "source_identifier": "192.0.2.175",
  "class": "copyright",
  "type": "usenet",

  "source_port": 119,
  "evidence_source": "automated_scan",
  "evidence": [
    {
      "content_type": "text/plain",
      "description": "Usenet post metadata",
      "payload": "YWx0LmJpbmFyaWVzLm1vdmllcyAtIGNvcHlyaWdodGVkIGNvbnRlbnQ="
    }
  ],
  "confidence": 0.91,

  "tags": ["platform:usenet", "newsgroup:alt.binaries"],
  "description": "Copyrighted content posted to Usenet binary newsgroup"
}
```

<a href="https://github.com/xarf/xarf-spec/blob/main/schemas/v4/types/copyright-usenet.json" style="display:none">Schema</a>

</details>

---

## Related Documentation

- [Common Fields Reference]({{ site.baseurl }}/docs/common-fields/) - Detailed documentation of core XARF fields
- [Schema Reference]({{ site.baseurl }}/docs/schemas/) - JSON Schema validation documentation
- [All Event Types]({{ site.baseurl }}/docs/types/) - Browse other categories
