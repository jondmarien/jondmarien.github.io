---
title: OBS Scene Layout Action Plan
author:
  - Jon Marien
created: 2025-03-26
published: 2025-03-26
tags:
  - bearhacks2025
---

| Title                        | Author                       | Created        | Published      | Tags                               |
| ---------------------------- | ---------------------------- | -------------- | -------------- | ---------------------------------- |
| OBS Scene Layout Action Plan | <ul><li>Jon Marien</li></ul> | March 26, 2025 | March 26, 2025 | [[#bearhacks2025\|#bearhacks2025]] |

# OBS Scene Layout Action Plan for Hackathon

## Scene 1: Main Event/Current Event Scene
- **Base Layout**: Keep the existing honeycomb background with the bear mascot
- **Action Items**:
    - Create a transparent content area in the center for displaying current activities.
    - Position the countdown timer at the bottom.
    - Add text overlay for "CURRENT EVENT" at the top (already implemented, we can remove it for a label in OBS or create each different event as a new scene).
    - Create a small info box in the bottom right for announcements.

## Scene 2: Opening/Closing Ceremony Scene
- **Base Layout**: Same honeycomb theme but with more formal arrangement
- **Action Items**:
    - Create larger central area for presentation slides.
    - Add smaller webcam feed area for speakers.
    - Position bear mascot in a less prominent corner.
    - Include hackathon logos and designs.
    - Add timer in smaller format

## Scene 3: Workshop/Presentation Scene
- **Base Layout**: Focus on content delivery
- **Action Items**:
    - Create large central area for presentation slides.
    - Add webcam feed for presenter in corner.
    - Include workshop title and presenter name text overlays.
    - Keep bear mascot as small accent element.
    - Add timer showing workshop duration/time remaining.

## Scene 4: Hacking Progress Scene
- **Base Layout**: Timer-focused with motivational elements
- **Action Items**:
    - Make countdown timer the central focus (larger than other scenes).
    - Add "TIME REMAINING" text overlay.
    - Include bear mascot in "hacking mode" if possible.
    - Create space for displaying upcoming events/schedule.
    - Add motivational messages that can be updated.

## Technical Implementation Plan:
1. **Create Animated Elements**:
    - Develop a loopable animation of the honeycomb background (as you mentioned at the bottom of your list).
    - Consider subtle animations for the bear mascot.
2. **Wireless Display Setup**:
    - Test OBS NDI plugin for wireless display across multiple floors. (<- Just thinking out loud)
    - Configure scene switching hotkeys for quick transitions. (<- I have a StreamDeck Neo for this, gonna be useful)
3. **Timer Integration**:
    - Set up a countdown plugin that can be controlled remotely. (<- can use timer obs plugin and run the timer off of a text file, I have done this before)
    - Create backup timer system in case of technical issues (<- can use the website countdown timer for time remaining to hack if sebastian implemented it)
4. **Scene Transitions**:
    - Design honeycomb-themed transitions between scenes (<- optional, last minute but would be cool)
    - Set up transition shortcuts for smooth operation (<- again, I have my stream deck :))