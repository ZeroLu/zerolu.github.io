# Interaction

## Principles

### Multi-modal input
Different input modalities create different constraints and opportunities for interaction design. Currently, there are head gaze, 3 DoF(Degree of freedom) controller, 6 DoF controller, hand tracking, voice recognition, object tracking (Like X-tag for Rhino X) and more input modalities for MR. We believe that these modalities would find their own unique application area in the future.
### Perceived affordance and signifier
Perceived affordance and signifier are terms brought to design by Donald Norman. MR is a simulated virtual world and people new to it would bring their knowledge of real world with them. They would expect the virtual object to behave like the real one.
Most of the time, we want to choose objects with fewer perceived affordances to guide the user towards the action we intended. Lots of VR games use console catrige to load a game level, not only because it symbolizes loading a game, but also catrige only "affords" being put into a tray for most peoeple.
[[picture]vague, unclear affordance : a ball | single affordance : a gu, a catrige]
Signifiers are traces of an object that indicate the intended use to the user. For instance, different sizes of button would signify different affordances. 
[pinch button, push button,  different actions from users]
Such signifiers can sometimes be too subtle so it's okay (sometimes necessary) to use some tips like text, voiceover and animations to help users out. These are also categorized as signifier.
### Continuous and rich feedback
When users correctly perceive designers' intent, they would try to appoarch it. Not only we should provide feedbacks for users' final action, but also for users' approaching action. This is why your mouse cursor turns into a hand when hovering a clickable link. With this feedback, we would know **whether a link is "clickable"** and **our cursor is within the effective range of the link** before pressing down mouse button.
Feedbacks are especially needed for **uncertain** actions. Hand tracking or controller tracking do not work 100% of the time, so more feedbacks are needed for the status of tracking.
[pictures that I haven't decided]
Use audio, vibration and particles to accomdate the absence of true haptic feedbacks. For games, these feedbacks are more sensational than functional.
### Onboarding
Most of MR users are first-time users and an proper onboarding experience is needed. Many of them actually don't know that they can move around in MR. Getting to know the button mapping of controllers proved to be challenging as well, especially for non-gaming users.
That's why we created a tested `UniversalOnboarding.unitypackage` which can be embeded into your experience to ensure a smooth yet not too long onboarding experience.
## One handed controller best practices
![controller](https://raw.githubusercontent.com/yinyuanqings/AIOSDK/gh-pages/img/Controller-Unity.png)
The Current controller for Rhino X is a one handed 6DoF controller with Daydream style button mapping. It's achieved with Ximmerse's proprietary marker tracking technology.
### Technology limitations
The controller cannot be tracked when markers are occluded. We will fall back to 3 DoF IMU tracking and use arm model to predict the position of the controller.
We also tilt the raycast by some degrees so that the controller is in an optimal position for tracking when performing raycasting.
### Grab
Grabbing is a fundamental interaction in MR. Feedbacks for hovering, grabbing can be easily added with our `InteractionToolkit.unitypackage`.
For far field interaction, we came up with several novel interaction techniques which you can try out.
[zoom grab]
[distance hover grab]
<!-- ### Onboarding -->

## X-tag possibilities
Due to the flexible marker tracking, pretty much anything can be brought into MR with X-tag.
This could unlock an uncharted terroritary where interactions in MR can become truly tangible. Stay tuned on this one.
<!--
### Technology limitations
### Case study: MR Kitchen Kit
-->
