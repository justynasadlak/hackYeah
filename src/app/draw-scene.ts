import { Image, Surface, Path, Text, Group, geometry } from '@progress/kendo-drawing';
const { Rect, Point, Size, transform } = geometry;

export function drawScene(surface: Surface) {

  const points = {
    screen: [0, 0, 1080, 1794],
    elements: [
      [0, 0, 1080, 1794, "android.widget.FrameLayout"],
      [0, 0, 1080, 1794, "android.widget.LinearLayout"],
      [0, 63, 1080, 1794, "android.widget.FrameLayout"],
      [0, 63, 1080, 1794, "android.view.ViewGroup"],
      [0, 63, 1080, 210, "android.widget.FrameLayout"],
      [0, 63, 1080, 210, "android.view.ViewGroup"],
      [42, 101, 519, 172, "android.widget.TextView"],
      [0, 210, 1080, 1794, "android.widget.FrameLayout"],
      [0, 210, 1080, 1794, "android.view.ViewGroup"],
      [0, 210, 1080, 1794, "android.widget.LinearLayout"],
      [0, 210, 131, 341, "android.widget.Button"],
      [0, 341, 394, 472, "android.widget.Button"],
      [0, 472, 919, 525, "android.widget.Button"],
      [0, 525, 26, 551, "android.widget.Button"],
      [0, 551, 121, 661, "android.widget.Button"],
      [0, 0, 1080, 63, "android.view.View"],
      [0, 0, 0, 0, "android.view.View"]]
  }

  // Create the square border by drawing a straight path
  const pathScreen = new Path({
    stroke: {
      color: "green",
      width: 2
    }
  });


  // The path is constructed by using a chain of commands
  pathScreen.moveTo(points.screen[0], points.screen[1])
    .lineTo(points.screen[2], points.screen[1]).lineTo(points.screen[2], points.screen[3]).lineTo(points.screen[0], points.screen[3])
    .close();

  // This rectangle defines the image position and size
  const imageRect = new Rect(
    new Point(points.screen[0], points.screen[1]),
    new Size(points.screen[2], points.screen[3])
  );

  // Create the image
  const imageUrl = `../assets/application.png`;
  const image = new Image(imageUrl, imageRect);
  const group = new Group();
  group.append(pathScreen, image);

  points.elements.forEach(element => {
    let path = new Path({
      stroke: {
        color: "red",
        width: 2
      }
    });

    path.moveTo(element[0], element[1])
      .lineTo(element[2], element[1]).lineTo(element[2], element[3]).lineTo(element[0], element[3])
      .close();
    group.append(path);

    group.transform(
      transform().translate(50, 50)
    );

    surface.draw(group);

  });

  // Translate the group
  group.transform(
    transform().translate(50, 50)
  );

  // Render the group on the surface
  surface.draw(group);

}
