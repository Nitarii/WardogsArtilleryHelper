# WARDOGS Artillery Helper

Interactive fire-control helper for **WARDOGS**, published at:

**https://nitarii.github.io/WardogsArtilleryHelper/**

## Features

- Calibrated **Bakurani, Ozeti and Zestafona** maps
- Color map imagery with automatic grayscale fallback
- HD tiled zoom plus a low-resolution overview so the map does not intentionally render as an empty field
- Map selector, POI layer, towers and faction spawn references
- Click to place `GUN` then `TARGET`, or type exact X/Y coordinates
- Per-map saved gun/target positions
- Distance, compass bearing, 6400-mil azimuth, firing elevation and estimated dispersion
- L81 Mortar firing-table interpolation
- SPH-2 HIGH and LOW firing-table solutions where table data exists
- Terrain3D gun/target ASL sampling and ΔZ display
- Range rings, pan/zoom, desktop/mobile controls, FR/EN UI and copyable firing solutions

## Ballistics policy — reviewed 2026-09-23

There is no official BULKHEAD firing table publicly available. Community sources currently disagree at the edges of weapon range, so this tool deliberately separates two things:

1. **Reference firing-table data**: used to calculate MIL by interpolation. It is based on the current MIT-licensed `apollyon-sys/wardogs-calculator` dataset.
2. **Reported Season 1 envelope**: shown as context only. Recent community models report roughly **52–685 m for the L81** and **745–2660 m for the SPH-2**.

The tool does not intentionally extrapolate a MIL beyond available reference rows. Where current sources disagree, the interface distinguishes the measured/reference table from the wider reported Season 1 envelope instead of silently presenting an uncertain value as confirmed.

Terrain3D height difference is displayed but is **not automatically applied to elevation MIL**. Current community terrain-correction models remain experimental/model-dependent, and SPH-2 chassis tilt can change actual range. Use the first shell as a ranging shot and level the SPH-2 before firing.

Estimated dispersion uses currently reported community figures of roughly **50 MOA for L81** and **10 MOA for SPH-2**. These are not official developer specifications.

## Data sources

- `apollyon-sys/wardogs-calculator` — current map calibration, map tile endpoints, Terrain3D format and reference firing tables (MIT, Copyright © 2026 Apollyon)
- WARDOGS Hub artillery calculator / Season 1 guide — current community-reported range envelopes, reload and dispersion context
- Other current community calculators — cross-checks on range and firing-table behavior
- Official WARDOGS / Steam patch notes — checked for recent artillery balance changes

See `THIRD_PARTY_NOTICES.md` for upstream license notice and attribution.

## Disclaimer

This is an unofficial community utility. It is not affiliated with or endorsed by BULKHEAD, Team17 or the WARDOGS development team. WARDOGS names, trademarks and game assets belong to their respective owners.
