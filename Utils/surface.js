import { Plane } from "./plane";
import { Vector2, Vector3 } from "./vector";
import { Quaternion } from "./quaternion";

class Shape2D {
	constructor(vertices, scaleX, scaleY) {
		this.vertices = vertices;
		this.scaleX = scaleX;
		this.scaleY = scaleY;
	}
	/**
	 * Calculate the area of a polygon using the shoelace formula.
	 *
	 * @return {number} The area of the polygon.
	 */
	getArea() {
		let area = 0;

		for (let i = 0; i < this.vertices.length; i++) {
			const v1 = coords[i];
			const v2 = coords[(i + 1) % coords.length];
			area += v1.x * v2.y - v2.x * v1.y;
		}

		return Math.abs(area) / 2;
	}
	/**
	 * Calculates and returns the center point of the vertices.
	 *
	 * @return {Vector2} The center point as a Vector2 object.
	 */
	getCenter() {
		let x = 0;
		let y = 0;
		for (const vertex of this.vertices) {
			x += vertex.x;
			y += vertex.y;
		}
		const count = this.vertices.length;
		x /= count;
		y /= count;
		return new Vector2(x, y);
	}
	/**
	 * Recenter the vertices of the shape by moving them to the origin.
	 *
	 * This function calculates the center of the shape by calling the getCenter() method.
	 * It then iterates over each vertex of the shape and subtracts the x and y coordinates
	 * of each vertex by the center coordinates.
	 *
	 * @return {void} This function does not return a value.
	 */
	recenter() {
		const center = this.getCenter();
		for (const vertex of this.vertices) {
			vertex.x -= center.x;
			vertex.y -= center.y;
		}
		return this;
	}

	/**
	 * Normalize the vertices to fit within a 0.5 x 0.5 square.
	 */
	normalize() {
		const minX = this.vertices.reduce((min, v) => Math.min(min, v.x), Infinity);
		const minY = this.vertices.reduce((min, v) => Math.min(min, v.y), Infinity);
		const maxX = this.vertices.reduce(
			(max, v) => Math.max(max, v.x),
			-Infinity
		);
		const maxY = this.vertices.reduce(
			(max, v) => Math.max(max, v.y),
			-Infinity
		);

		const width = maxX - minX;
		const height = maxY - minY;
		const centerX = (minX + maxX) / 2;
		const centerY = (minY + maxY) / 2;

		for (const vertex of this.vertices) {
			vertex.x = ((vertex.x - centerX) / width) * 0.5;
			vertex.y = ((vertex.y - centerY) / height) * 0.5;
		}
		return this;
	}
	// Class method helpers for generating simple shapes:

	/**
	 * Creates a new Shape2D object representing a rectangle with the given width and height.
	 *
	 * @param {number} width - The width of the rectangle.
	 * @param {number} height - The height of the rectangle.
	 * @return {Shape2D} A new Shape2D object representing the rectangle.
	 */
	static Rectangle(width, height) {
		return new Shape2D(
			[
				new Vector2(-0.5, -0.5), // Top Left
				new Vector2(0.5, -0.5), // Top Right
				new Vector2(0.5, 0.5), // Bottom Right
				new Vector2(-0.5, 0.5), // Bottom Left
			],
			width,
			height
		); // Divide by 2 because the points are defined by -1 to 1, a range of 2.
	}
	/**
	 * A static method to create an ellipse shape.
	 *
	 * @param {number} width - the width of the ellipse
	 * @param {number} height - the height of the ellipse
	 * @param {number} [rotation=0] - the rotation angle in radians
	 * @param {number} [resolution=32] - the number of vertices to approximate the ellipse
	 * @return {Shape2D} the 2D shape representing the ellipse
	 */
	static Ellipse(width, height, rotation = 0, resolution = 32) {
		const vertices = [];

		for (let i = 0; i < resolution; i++) {
			const angle = (i / resolution) * Math.PI * 2 + rotation;
			const x = Math.cos(angle) * width;
			const y = Math.sin(angle) * height;
			vertices.push(new Vector2(x, y));
		}

		return new Shape2D(vertices, width, height);
	}
}
class Surface2D {
	/**
	 * Constructor for the Surface2D class.
	 *
	 * @param {Plane} plane - description of parameter
	 * @param {Shape2D} shape - description of parameter
	 * @param {Vector3} position - description of parameter
	 * @return {Surface2D} description of return value
	 */
	constructor(plane, shape, position) {
		this.plane = plane ? plane.normalize() : new Plane();
		this.shape = shape ? shape.recenter().normalize() : new Shape2D();
		this.position = position || new Vector3();
	}
	getArea() {
		return this.shape.getArea();
	}

	getCenter() {
		return this.shape.getCenter().add(this.position);
	}
	rotateByAngle(axis, angle) {
		this.plane.rotateByAngle(axis, angle);
		return this;
	}

	rotateByQuaternion(quaternion) {
		this.plane.rotateByQuaternion(quaternion);
		return this;
	}
}

export { Shape2D, Surface2D };
