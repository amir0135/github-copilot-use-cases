## Agent Mode

### Example: 3D Interactive Rubik's Cube

```
Create a self-contained HTML file that displays and animates a 3D Rubik's cube with the following features:

Requirements:
1. Use Three.js (via CDN) for 3D rendering
2. Display a standard 3x3x3 Rubik's cube with realistic colors (white, yellow, red, orange, blue, green)
3. Allow 3D rotation by dragging with the mouse
4. Include a shuffle button that performs random rotations
5. Enable solving the cube using arrow keys to rotate faces:
   - Arrow keys (↑↓←→) to rotate different faces of the cube
   - Include visual hints or on-screen guide showing which face each arrow controls
6. Add configurable parameters with UI controls:
   - Shuffle complexity (number of random moves: 5-50)
   - Animation speed (slow/medium/fast)
   - Auto-rotate toggle (enable/disable continuous rotation)
   - Reset button to return to solved state

Technical specifications:
- Single HTML file with embedded CSS and JavaScript
- Responsive design that works on desktop and mobile
- Smooth animations for cube rotations
- Clean, modern UI with controls panel
- Add keyboard shortcuts: Space = shuffle, R = reset, A = toggle auto-rotate, Arrow keys = rotate cube faces
- Ensure colored faces maintain their colors during all rotations and shuffling (fix any black square issues)

The cube should be visually appealing with:
- Proper lighting and shadows
- Smooth rotation animations
- Clear separation between cube faces
- Professional color scheme for the UI
- Persistent face colors throughout all transformations (no black squares appearing)

Save the file as "rubiks-cube-3d.html"
```

### Why This Prompt Works for Agent Mode:

1. **Clear Objective**: Specifies exactly what to build (self-contained HTML file with 3D Rubik's cube)
2. **Detailed Requirements**: Lists all features and functionality needed
3. **Technical Constraints**: Mentions specific libraries and implementation details
4. **User Experience**: Describes interaction methods and UI elements
5. **Output Specification**: Names the file to create
6. **Measurable Success**: Easy to verify if all requirements are met

### Expected Agent Behavior:

The agent will:
- Plan the implementation steps
- Create the HTML file with Three.js integration
- Implement the 3D cube geometry and materials
- Add mouse controls for rotation
- Create the shuffle algorithm
- Build the UI controls panel
- Test and refine the implementation
- Provide the complete, working file
