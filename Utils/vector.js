import { Quaternion } from "./quaternion";
class Vector2 {
	constructor(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	}
	/**
	 * Returns a clone of this vector.
	 * @returns {Vector2}
	 */
	clone() {
		return new Vector2(this.x, this.y);
	}
	/**
	 * Make this vector copy the values of the other.
	 * @param {Vector2} vector
	 * @returns Vector2
	 */
	copy(vector) {
		this.x = vector.x;
		this.y = vector.y;
		return this;
	}
	/**
	 * Set this vector.
	 * @param {number} x
	 * @param {number} y
	 * @returns {Vector2}
	 */
	set(x, y) {
		this.x = x;
		this.y = y;
		return this;
	}
	/**
	 * Reset this vector to 0, 0.
	 * @returns {Vector2}
	 */
	reset() {
		this.x = 0;
		this.y = 0;
		return this;
	}
	/**
	 * Scale this vector.
	 * @param {number} scalar
	 * @param {Vector2} [target]
	 * @returns {Vector2}
	 */
	scale(scalar, target) {
		target = target || new Vector2();
		target.x = this.x * scalar;
		target.y = this.y * scalar;
		return target;
	}

	/**
	 * Add another vector to this vector component-wise.
	 * @param {Vector2} vector
	 * @returns {Vector2}
	 */
	add(vector) {
		this.x += vector.x;
		this.y += vector.y;
		return this;
	}

	/**
	 * Multiply the vector with an other vector component-wise.
	 * @param [target] The vector to save the result in.
	 * @returns {Vector2}
	 */
	multiply(vector, target) {
		target = target || new Vector2();
		target.x = vector.x * this.x;
		target.y = vector.y * this.y;
		return target;
	}

	/**
	 * Do a linear interpolation between two vectors
	 * @param [t] A number between 0 and 1. 0 will make this function return this, and 1 will make it return the other vector. Numbers in between will generate a vector in between them.
	 * @param [target] The vector to save the result in
	 * @returns {Vector2}
	 */
	lerp(vector, t = 0.5, target) {
		target = target || new Vector2();
		const x = this.x;
		const y = this.y;
		target.x = x + (vector.x - x) * t;
		target.y = y + (vector.y - y) * t;
		return target;
	}

	/**
	 * Get the vector length
	 * @returns {number}
	 */
	length() {
		const x = this.x;
		const y = this.y;
		return Math.sqrt(x * x + y * y);
	}
	/**
	 * Get the vector length squared
	 * @returns {number}
	 */
	lengthSquared() {
		const x = this.x;
		const y = this.y;
		return x * x + y * y;
	}

	/**
	 * Get distance from this point to another point
	 * @param {Vector2} p
	 * @returns {number}
	 */
	distanceTo(o) {
		const x = this.x;
		const y = this.y;
		const ox = o.x;
		const oy = o.y;
		return Math.sqrt((ox - x) * (ox - x) + (oy - y) * (oy - y));
	}

	/**
	 * Get squared distance from this point to another point
	 * @param {Vector2} p
	 * @returns {number}
	 */
	distanceSquared(o) {
		const x = this.x;
		const y = this.y;
		const ox = o.x;
		const oy = o.y;
		return (ox - x) * (ox - x) + (oy - y) * (oy - y);
	}

	/**
	 * Negate the vector
	 * @returns {Vector2}
	 */
	negate(target) {
		target = target || new Vector2();
		target.x = -this.x;
		target.y = -this.y;
		return target;
	}
	/**
	 * Convert this vector to an Array.
	 * @returns {Array}
	 */
	toArray() {
		return [this.x, this.y];
	}
	/**
	 * Convert this vector to an Object.
	 * @returns {Object}
	 */
	toObject() {
		return {
			x: this.x,
			y: this.y,
		};
	}
	/**
	 * Convert this vector to a String.
	 * @returns {String}
	 */
	toString() {
		return `(${this.x}, ${this.y})`;
	}
	/**
	 * Normalize the vector
	 * @param {Vector2} [target]
	 * @returns {Vector2}
	 */
	normalize(target) {
		target = target || new Vector2();
		const x = this.x;
		const y = this.y;
		const len = Math.sqrt(x * x + y * y);
		if (len > 0) {
			target.x = x / len;
			target.y = y / len;
		}
		return target;
	}
	/**
	 * Creates a vector with random values.
	 * @param {Vector2} [target]
	 */
	random(target) {
		target = target || new Vector2();
		target.x = Math.random();
		target.y = Math.random();
		return target;
	}
}

class Vector3 {
	constructor(x, y, z) {
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
	}
	/**
	 * Returns a clone of this vector.
	 * @returns {Vector3}
	 */
	clone() {
		return new Vector3(this.x, this.y, this.z);
	}
	/**
	 * Make this vector copy the values of the other.
	 * @param {Vector3} vector
	 * @returns Vector3
	 */
	copy(vector) {
		this.x = vector.x;
		this.y = vector.y;
		this.z = vector.z;
		return this;
	}
	/**
	 * Creates a vector with random values.
	 * @param {Vector3} [target]
	 * @returns {Vector3}
	 */
	random(target) {
		target = target || new Vector3();
		target.x = Math.random();
		target.y = Math.random();
		target.z = Math.random();
		return target;
	}
	/**
	 * Set this vector.
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 * @returns {Vector3}
	 */
	set(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
		return this;
	}
	/**
	 * Reset this vector to 0, 0, 0.
	 * @returns {Vector3}
	 */
	reset() {
		this.x = 0;
		this.y = 0;
		this.z = 0;
		return this;
	}
	/**
	 * Get the vector length.
	 * @returns {number}
	 */
	length() {
		const x = this.x;
		const y = this.y;
		const z = this.z;
		return Math.sqrt(x * x + y * y + z * z);
	}
	/**
	 * Get the squared length of the vector.
	 * @returns {number}
	 */
	lengthSquared() {
		return this.dot(this);
	}
	/**
	 * Get distance from this point to another point.
	 * @param {Vector3} p
	 * @returns {number}
	 */
	distanceTo(o) {
		const x = this.x;
		const y = this.y;
		const z = this.z;
		const ox = o.x;
		const oy = o.y;
		const oz = o.z;
		return Math.sqrt(
			(ox - x) * (ox - x) + (oy - y) * (oy - y) + (oz - z) * (oz - z)
		);
	}
	/**
	 * Get squared distance from this point to another point.
	 * @param {Vector3} p
	 * @returns {number}
	 */
	distanceSquared(o) {
		const x = this.x;
		const y = this.y;
		const z = this.z;
		const ox = o.x;
		const oy = o.y;
		const oz = o.z;
		return (ox - x) * (ox - x) + (oy - y) * (oy - y) + (oz - z) * (oz - z);
	}
	/**
	 * Scales this vector.
	 * @param {number} scalar
	 * @param {Vector3} [target]
	 * @returns {Vector3}
	 */
	scale(scalar, target) {
		target = target || new Vector3();
		target.x = this.x * scalar;
		target.y = this.y * scalar;
		target.z = this.z * scalar;
		return target;
	}
	/**
	 * Multiply the vector with an other vector component-wise.
	 * @param [target] The vector to save the result in.
	 * @returns {Vector3}
	 */
	multiply(vector, target) {
		target = target || new Vector3();
		target.x = vector.x * this.x;
		target.y = vector.y * this.y;
		target.z = vector.z * this.z;
		return target;
	}

	/**
	 * Add another vector to this vector component-wise.
	 * @param {Vector3} vector
	 * @returns {Vector3}
	 */
	add(vector) {
		this.x += vector.x;
		this.y += vector.y;
		this.z += vector.z;
		return this;
	}
	/**
	 * Make the vector point in the opposite direction.
	 * @param {Vector3} [target]
	 * @returns {Vector3}
	 */
	negate(target) {
		target = target || new Vector3();
		target.x = -this.x;
		target.y = -this.y;
		target.z = -this.z;
		return target;
	}
	/**
	 * Do a linear interpolation between two vectors
	 * @param [t] A number between 0 and 1. 0 will make this function return this, and 1 will make it return the other vector. Numbers in between will generate a vector in between them.
	 * @param [target] The vector to save the result in
	 * @returns {Vector3}
	 */
	lerp(vector, t = 0.5, target) {
		target = target || new Vector3();
		const x = this.x;
		const y = this.y;
		const z = this.z;
		target.x = x + (vector.x - x) * t;
		target.y = y + (vector.y - y) * t;
		target.z = z + (vector.z - z) * t;
		return target;
	}
	/**
	 * Calculate the dot product
	 * @param {Vector3} vector
	 * @returns {number}
	 */
	dot(vector, target) {
		target = target || new Vector3();
		const x = this.x;
		const y = this.y;
		const z = this.z;
		const vx = vector.x;
		const vy = vector.y;
		const vz = vector.z;
		return x * vx + y * vy + z * vz;
	}
	/**
	 * Convert to Array
	 * @returns {Array}
	 */
	toArray() {
		return [this.x, this.y, this.z];
	}
	/**
	 * Convert to Object
	 * @returns {Object}
	 */
	toObject() {
		return {
			x: this.x,
			y: this.y,
			z: this.z,
		};
	}
	/**
	 * Convert to String
	 * @returns {String}
	 */
	toString() {
		return `(${this.x}, ${this.y}, ${this.z})`;
	}
	/**
	 * Normalize
	 * @param {Vector3} [target]
	 * @returns {Vector3}
	 */
	normalize(target) {
		target = target || new Vector3();
		const x = this.x;
		const y = this.y;
		const z = this.z;
		const len = Math.sqrt(x * x + y * y + z * z);
		if (len > 0) {
			target.x = x / len;
			target.y = y / len;
			target.z = z / len;
		}
		return target;
	}
	/**
	 * Subtract another vector from this one component-wise.
	 * @param {Vector3} vector
	 * @param {Vector3} [target]
	 * @returns
	 */
	subtract(vector, target) {
		target = target || new Vector3();
		target.x = this.x - vector.x;
		target.y = this.y - vector.y;
		target.z = this.z - vector.z;
		return target;
	}
	/**
	 * Vector cross product.
	 * @param [target] Target to save in.
	 * @returns {Vector3}
	 */
	cross(vector, target) {
		target = target || new Vector3();
		const vx = vector.x;
		const vy = vector.y;
		const vz = vector.z;
		const x = this.x;
		const y = this.y;
		const z = this.z;

		target.x = y * vz - z * vy;
		target.y = z * vx - x * vz;
		target.z = x * vy - y * vx;

		return target;
	}
	/**
	 * Checks if the current object is equal to another object.
	 *
	 * @param {Object} other - The object to compare with.
	 * @return {boolean} Returns true if the objects are equal, false otherwise.
	 */
	equals(other) {
		return this.x === other.x && this.y === other.y && this.z === other.z;
	}
	/**
	 * Rotate this vector `angle` radians around `axis`.
	 * @param {Vector3} axis - The axis to rotate around
	 * @param {Number} angle - The angle in radians
	 * @param {Vector3} [target]
	 */
	rotateByAngle(axis, angle, target) {
		target = target || new Vector3();
		axis = axis.normalize(); // Ensure the axis is normalized
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);

		// Rodrigues' rotation formula
		const rotatedNormal = this.scale(cos)
			.add(axis.cross(this.normal).scale(sin))
			.add(axis.scale(axis.dot(this.normal) * (1 - cos)));
		target.copy(rotatedNormal.normalize());
		return target;
	}
	/**
	 * Creates a quaternion from the vector to be rotated (w = 0 for a pure quaternion).
	 *
	 * @param {Quaternion} [target=new Quaternion()] - The target quaternion to store the result. If not provided, a new Quaternion instance will be created.
	 * @return {Quaternion} The target quaternion with the vector values set.
	 */
	quaternion(target) {
		target = target || new Quaternion();
		// Create a quaternion from the vector to be rotated (w = 0 for a pure quaternion)
		target.set(this.x, this.y, this.z, 0).normalize();
		return target;
	}
	/**
	 * Rotates a vector by the given quaternion.
	 *
	 * @param {Quaternion} quaternion - The quaternion to rotate by
	 * @param {Vector3} target - The target vector to store the result (optional)
	 * @return {Vector3} The rotated vector
	 */
	rotateByQuaternion(quaternion, target) {
		target = target || new Vector3();
		// Create a quaternion from the vector to be rotated (w = 0 for a pure quaternion)
		const vectorQuat = new Quaternion(this.x, this.y, this.z, 0);

		// The rotated vector is given by q * v * q^(-1)
		const inverseQuat = quaternion.clone().invert(); // q^(-1)
		const rotatedQuat = quaternion
			.clone()
			.multiply(vectorQuat)
			.multiply(inverseQuat); // q * v * q^(-1)

		// Return the rotated vector part of the quaternion
		return new Vector3(rotatedQuat.x, rotatedQuat.y, rotatedQuat.z);
	}
	/**
	 * Rotates this vector by the angle required to align it with another vector.
	 * @param {Vector3} other The vector to align this vector to.
	 * @param {Vector3} [target] The target vector where the result is stored.
	 * @returns {Vector3}
	 */
	rotateByVector(other, target) {
		target = target || new Vector3();

		// Normalize the vectors to get their direction
		const thisNormalized = this.clone().normalize();
		const otherNormalized = other.clone().normalize();

		// Calculate the rotation axis which is the cross product of the two vectors
		const axis = thisNormalized.cross(otherNormalized);

		// Calculate the angle between the vectors
		const angle = Math.acos(thisNormalized.dot(otherNormalized));

		// Create a quaternion for the rotation
		const quaternion = new Quaternion(
			axis.x,
			axis.y,
			axis.z,
			Math.cos(angle / 2)
		);
		quaternion.normalize(); // Normalize the quaternion to ensure a proper rotation

		// Rotate this vector by the quaternion
		return quaternion.rotateVector(thisNormalized, target);
	}
	/**
	 * Calculates the quaternion rotation that transforms this vector into another vector.
	 *
	 * @param {Vector} other - The vector to be transformed into.
	 * @return {Quaternion} The quaternion rotation that transforms this vector into the other vector.
	 */
	getDifference(other) {
		// Normalize the vectors to get their direction
		const normalized1 = this.clone().normalize();
		const normalized2 = other.clone().normalize();

		// Calculate the rotation axis which is the cross product of the two vectors
		const axis = normalized1.cross(normalized2);

		// Calculate the angle between the vectors
		const angle = Math.acos(normalized1.dot(normalized2));

		// Create a quaternion for the rotation
		const quaternion = new Quaternion(
			axis.x,
			axis.y,
			axis.z,
			Math.cos(angle / 2)
		);
		quaternion.normalize(); // Normalize the quaternion to ensure a proper rotation

		return quaternion;
	}
	test() {
		const vector1 = new Vector3(1, 0, 0);
		const vector2 = new Vector3(0, 1, 0);
		vector1 = vector1.rotateByVector(vector2);
		console.assert(vector1.x === 0 && vector1.y === 0 && vector1.z === 1);
		console.assert(vector2.x === 0 && vector2.y === 0 && vector2.z === 1);
	}
}

export { Vector2, Vector3 };

/*
Suppose I have two vectors. Vector #1 always starts at 0, 0, 0. Vector #2 may start at any value. When Vector #1 rotates, Vector #2 should be rotated to match the original difference in orientation between Vector #1 and Vector #2. Create a Javascript function that takes the current value of Vector #2 and the new value of Vector #1 and rotates Vector #2 so that it the difference between the vectors is the same. The Vector3 class is already defined in `vector.js`. 

If you find that you need a new class for `Quaternion` or something else, feel free to implement it yourself as you see fit.

The function should be implemented in keeping with the general Javascript style and should be robust and accurate in all situations. The code will be tested on many different examples and should run without errors. If the problem cannot be solved as requested, submit "impossible" as your answer. Good luck!
*/
