# WARDOGS Artillery Helper

Interactive fire-control helper for **WARDOGS**.

## Features

- Bakurani, Ozeti and Zestafona interactive maps
- Click to place the artillery position, then click a target
- Distance, compass bearing, 6400-mil azimuth and firing elevation
- L81 Mortar and SPH-2 ballistic tables with interpolation
- SPH-2 high/low trajectory display when available
- Range rings, zoom, pan and mobile controls
- French/English interface (defaults to browser language)

## Usage

1. Select the map and weapon.
2. Click your artillery position (`GUN`).
3. Click the target (`TARGET`).
4. Enter the displayed bearing/azimuth and elevation in game.

The calculated elevation is a baseline flat-ground firing solution. Terrain height differences and SPH-2 vehicle tilt can alter the impact point.

## Data attribution

Map calibration, tile endpoints and ballistic reference data are derived from the MIT-licensed `apollyon-sys/wardogs-calculator` community project (Copyright © 2026 Apollyon), with a separate UI and implementation for this repository.

WARDOGS and its game assets belong to their respective owners. This is an unofficial community tool.
