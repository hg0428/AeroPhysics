import { Vector3 } from "./vector";
/**
 * Constructor for creating a Plane.
 *
 * @param {Vector3} normal - the normal parameter
 * @return {Plane}
 */
class Plane {
	constructor(normal) {
		this.normal = normal || Vector3();
	}
	/**
	 * Check if the point is on the plane.
	 * @param {Vector3} point
	 * @returns {Boolean}
	 */
	checkPointOnPlane(point) {
		return this.normal.dot(point) === 0;
	}
	/**
	 * Rotate the normal vector of the plane `angle` degrees around `axis`.
	 * @param {Vector3} axis - The axis to rotate around
	 * @param {Number} angle - In radians
	 */
	rotateByAngle(axis, angle) {
		axis = axis.normalize(); // Ensure the axis is normalized
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);

		// Rodrigues' rotation formula
		const rotatedNormal = this.normal
			.scale(cos)
			.add(axis.cross(this.normal).scale(sin)) // (Axis x Normal) * sin(theta)
			.add(axis.scale(axis.dot(this.normal) * (1 - cos))); // Axis * (Axis . Normal) * (1 - cos(theta))

		this.normal = rotatedNormal.normalize(); // Update the plane's normal vector
	}
	/**
	 * Rotate the normal vector of the plane by the given Quaternion.
	 * @param {Quaternion} quaternion - The Quaternion to rotate the plane by
	 */
	rotateByQuaternion(quaternion) {
		this.normal.rotateByQuaternion(quaternion);
	}
}

export { Plane };
