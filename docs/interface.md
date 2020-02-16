# User Interface

Best UI is no UI at all. This is especially true for MR. UI in MR should be ergonomical, unobtrusive and only appear when it's needed.

## Types of UI
In MR, based on where UI is anchored, UI can be defined as world space, head space and controller space.

|  Word Space   | Head Space  | Controller Space |
|  ----  | ----  | ----  |
|  ![Word Space]()  | ![Head Space]()  | ![Controller Space]()  |
| UI which is anchored to the world.   | UI which is anchored to the head. | UI which anchored to the controller. |
| Good for showing information about the world. Usually unobtrusive but can be missed if not carefully placed.  | Combined with tag-along, users cannot miss it. Only use it to show absolutely vital information since it can be obtrusive. Ergonomics need to be carefully considered. No ironman's HUD please. | Users can see the UI when they need it by raising the arm. Perfect for a tool palette or bullet counter. |

Based on whether or not it's integrated to the game's narrative, UI can be defined as non-diegetic UI and diegetic UI. A proper designed diegetic UI would increase illusion. A explanation of definitions can be found in a [Gamasutra article](https://www.gamasutra.com/blogs/AnthonyStonehouse/20140227/211823/User_interface_design_in_video_games.php).

|    Non-diegetic    | Diegetic |
| ----------         | ---      |
|  ![Non-diegetic]()  | ![Diegetic]()  |
| UI which is not part of the game's narrative.  |  UI which is part of the game's narrative. This includes using a scoreboard to show competition stats or a hologram projector to project UI. |

## Ergonomics
Ergonomics of UI are fundational principles. It's the bottom line of a useable UI.

### Previous work
There has been quite some research into the size and distance part of spatial UI throughout these years.

Alex Chu from Samsung Research did research on the comfort range of head rotation and how '3D' an object feels at various distances.

<iframe width="100%" height="400" src="https://www.youtube.com/embed/XjnHr_6WSqo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<!-- Mike Alger further developed it into zones for content placement and interaction area. He also cited data from [*Visual Ergonomics in the Office*](https://docplayer.net/20715044-Visual-ergonomics-in-the-office.html).

<iframe width="100%" height="400" src="https://www.youtube.com/embed/id86HeV-Vb8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->

Google invented `dmm` to make it easier to calculate size in spatial, which Ximmerse adopted as well. They also established standards for text (1.375° or about 24dmm) and hit target(For the current gen VR headsets like Oculus Rift, HTC Vive with controller tracking. Not for HoloLens and Magic Leap One). A [sketch sticker sheet]() was also provided.

<iframe width="100%" height="400" src="https://www.youtube.com/embed/ES9jArHRFHQ?start=492" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Unfortunately there are no shared golden rules yet for different XR devices out there since they have different field of view, optical design and angular resolution ([Field of view](http://doc-ok.org/?p=1414) and [angular resolution](https://twitter.com/PalmerLuckey/status/756243796275310593) for headsets even have no established standards). For HoloLens with a high angular resolution, the [minimal text size](https://docs.microsoft.com/zh-cn/windows/mixed-reality/text-in-unity#the-minimum-legible-font-size) is about 0.4° or 7dmm according to their doc. For Magic Leap One, [this number](https://developer.magicleap.com/learn/guides/design-typography) is 8dmm. For Rhino X, the number is 22dmm.

### Rhino X standards

|   Item             | Rhino X  |
| ----------         | ---      |
| Headline text size  | 38dmm    |
| Title text size  | 30dmm    |
| Body text size  | 22dmm    |
| Caption text size  | 18dmm    |
| Minimal hit target size  | 64dmm    |
| Field of view | 50°(H) x 57°(V) |
| Optimal UI distance | 1.5m |
| UI panel center  | 6° down    |
| Recommended world space UI panel width  | 50°    |
| Recommended world space UI panel height  | 55°    |
| Maximum world space UI panel width  | 120°    |
| Maximum world space UI panel height  | 120°    |
| Maximum head space UI panel width  | 30°    |
| Maximum head space UI panel height  | 30°    |
| Minimum line width  | 3dmm (white line on black) 2dmm (black line on white)   |
| Minimum background color brightness  |  >10%  |
| Minimum info color brightness  |  50%  |

If you are developing for Rhino X, do check out our [UI template](/) and [Unity package](/) to kickstart your design.
<img alt="Image of a cheat sheat" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVwAAACRCAMAAAC4yfDAAAAAMFBMVEXZ2dnV1dW2traqqqrOzs7Jycm+vr7c3Nytra2zs7PGxsa7u7vKysrY2NjS0tLDw8N7mvbnAAAC50lEQVR4nO3c0XKbMBRFUQSYK4FB//+3lW1wgHJAlGSStns92Q7uNLuMcoVTigIAAAAAAAAAAAAAAAAAAAAAAAAAAAD4W1nhLkhvh2TRVxf45ru/gR/MmsqXF/iq49xV+so7u6AI1fDd38OPVVfNpTPP2ur2WX+Xf87VuAVxNeJ+IeJ+ofNx01w8zKZb4mrn4zZl05RdPz0lrnY6bqgfE9gQ3PicuNrJuNYNr8NdGF8hrnYy7jDtxyzeXw+Iq52M29bTo2F8H3G1k3Hje6/rOuIeOXvm3qdHnLnHTsZ15bTmNuMCQVzt7LTQ3J+H2zBVJq52es4tY5Hm3HuYdhHE1U7HtVtZdiG+nxNX+4MLN1b0s7cQV9uMG4f84MTVNuK60Pg6uy5xtd/iWp3K9iHm1iWuto5rzet6V5n7oS5xtVXcPnSvByly3h9AXG0RNy0Jt+mZtd5tv2WJuNo8rkU/LErnDA3E1eZxy3L5Nefvx3WJq73j2uB/mxByhgbialPctMRuzbZdtx7U1gsxcbUpbve+ErNgcTE0WFeu/w2Iqz3jmvPqCoPd50NDGdP+YnkocbVHXLtV+idXWounc7UPrX1sM0bE1R5xG+/2fm65cfidhofnBvn9VeJqddWF8uigtBo8zuD32DtfGoir1b5qD8cta7rHlmL+Ap9EZMi7WG5tWCy0s6WBuFp23PVLblwaiKtlxbVmY1kelwbiallxty/uphE4LQ3E1XLiBnGIuRD5Dyc7juM6r8eJtB2OxJWO4prb2b09lwZPXOUgrtXV/hXztHUmrrIfN6U7+jSCNVfbjWvx+HM04mp7cWebXI242l7c9Wdqm4ir6bh9yPq9EOJqMq7+cGKJuJqIa0OV+dtixNW246bx9pbXlrg7NuNaW2X/Dilxta24Fg+3Dh/HElfbusdNF3rucfMZNu7OFHzg7kyfI21xL+G+Ynu4Ix4AAAAAAAAAAAAAAAAAAAAAAAAAAAD+W78Aqjkan4b2aooAAAAASUVORK5CYII=" width="100%">

### How to implement
1. Design your UI with our UI template in Sketch or other vector software
Be mindful of the standards when designing, especially when it comes to line width and color choice.
2. Export your files into the image files
Be sure to export with bleeding to reduce aliasing.
3. Import the Unity package.

4. For primary canvas, drag PrimaryCanvas prefab into hierachy.
Tip: When replacing images, simply click 'Set Native Size' button!

5. For secondary canvas, drag teh 


### Orientation

#### Billboard-all and billboard-y
#### Avoid clipping
### Color
#### Introduction
#### Color guideline for content
#### Color guideline for border
#### Dealing with pictures


