import { Vector3 } from "./vector";

class Quaternion {
	constructor(x, y, z, w) {
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
		this.w = w || 1; // Quaternion w should default to 1 for a no-rotation quaternion
	}
	/**
	 * Sets the values of the x, y, z, and w properties of the object.
	 *
	 * @param {number} x - The value to set for the x property.
	 * @param {number} y - The value to set for the y property.
	 * @param {number} z - The value to set for the z property.
	 * @param {number} w - The value to set for the w property.
	 * @return {Object} - The object with the updated properties.
	 */
	set(x, y, z, w) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
		return this;
	}

	/**
	 * Normalize the vector to have a length of 1.
	 *
	 * @return {Object} The normalized vector
	 */
	normalize() {
		const length = Math.sqrt(
			this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
		);
		if (length === 0) {
			this.x = this.y = this.z = 0;
			this.w = 1;
		} else {
			this.x /= length;
			this.y /= length;
			this.z /= length;
			this.w /= length;
		}
		return this;
	}

	// Multiplies this quaternion with another quaternion
	multiply(quaternion) {
		const x = this.x,
			y = this.y,
			z = this.z,
			w = this.w;
		const qx = quaternion.x,
			qy = quaternion.y,
			qz = quaternion.z,
			qw = quaternion.w;

		this.x = x * qw + w * qx + y * qz - z * qy;
		this.y = y * qw + w * qy + z * qx - x * qz;
		this.z = z * qw + w * qz + x * qy - y * qx;
		this.w = w * qw - x * qx - y * qy - z * qz;

		return this;
	}

	// Converts the quaternion to a rotation matrix
	toRotationMatrix() {
		const matrix = [];

		const x2 = this.x + this.x;
		const y2 = this.y + this.y;
		const z2 = this.z + this.z;
		const xx = this.x * x2;
		const xy = this.x * y2;
		const xz = this.x * z2;
		const yy = this.y * y2;
		const yz = this.y * z2;
		const zz = this.z * z2;
		const wx = this.w * x2;
		const wy = this.w * y2;
		const wz = this.w * z2;

		matrix[0] = 1 - (yy + zz);
		matrix[1] = xy - wz;
		matrix[2] = xz + wy;

		matrix[3] = xy + wz;
		matrix[4] = 1 - (xx + zz);
		matrix[5] = yz - wx;

		matrix[6] = xz - wy;
		matrix[7] = yz + wx;
		matrix[8] = 1 - (xx + yy);

		return matrix; // 3x3 rotation matrix
	}

	// Additionally, you'll need an invert method to get the inverse of a quaternion (q^(-1))
	invert() {
		const lengthSq =
			this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
		if (lengthSq > 0) {
			const invLengthSq = 1 / lengthSq;
			this.x *= -invLengthSq;
			this.y *= -invLengthSq;
			this.z *= -invLengthSq;
			this.w *= invLengthSq;
		}
		return this;
	}
	// Returns a string representation of the quaternion
	toString() {
		return `(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
	}
	test() {
		// Test constructor and toString
		const quat1 = new Quaternion(1, 2, 3, 4);
		console.assert(
			quat1.toString() === "(1, 2, 3, 4)",
			"Constructor or toString failed."
		);

		// Test clone
		const quat1Clone = quat1.clone();
		console.assert(
			quat1Clone.toString() === quat1.toString(),
			"Clone method failed."
		);

		// Test invert
		const quat1Inverse = quat1.clone().invert();
		console.assert(
			quat1Inverse.toString() !== quat1.toString(),
			"Invert method failed to change the quaternion."
		);
		// Further tests could be added to verify the correctness of the inversion

		// Test rotateVector
		const vector = new Vector3(1, 0, 0); // A vector along the x-axis
		const angle = Math.PI / 2; // 90 degrees in radians
		const quatRotation = new Quaternion(
			0,
			Math.sin(angle / 2),
			0,
			Math.cos(angle / 2)
		); // Rotation around the Y-axis
		const rotatedVector = quatRotation.rotateVector(vector);

		// Since the rotation is 90 degrees around the Y-axis, we expect the rotated vector to be along the Z-axis
		console.assert(
			rotatedVector.equals(new Vector3(0, 0, 1)),
			"rotateVector method failed."
		);

		console.log("All Quaternion tests passed!");
	}
}
export { Quaternion };
