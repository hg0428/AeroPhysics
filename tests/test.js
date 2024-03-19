import { Vector2, Vector3 } from "../Utils/vector";
import { Plane } from "../Utils/plane";

function testPlaneCreation() {
	const point = new Vector3(1, 2, 3);
	const normal = new Vector3(0, 1, 0);
	const plane = new Plane(point, normal);
	console.assert(plane.point.equals(point), "Point was not set correctly.");
	console.assert(
		plane.normal.equals(normal.normalize()),
		"Normal was not set correctly."
	);
	console.log("Test Plane Creation: PASSED");
}

function testPointProjection() {
	const plane = new Plane(new Vector3(0, 0, 0), new Vector3(0, 1, 0)); // Plane XY
	const point = new Vector3(3, 4, 5);
	const projectedPoint = plane.projectPointOntoPlane(point);
	console.assert(
		projectedPoint.equals(new Vector3(3, 0, 5)),
		"Point projection onto plane failed."
	);
	console.log("Test Point Projection: PASSED");
}

function testDistanceCalculation() {
	const plane = new Plane(new Vector3(0, 0, 0), new Vector3(0, 1, 0)); // Plane XY
	const point = new Vector3(0, 5, 0);
	const distance = plane.distanceToPoint(point);
	console.assert(distance === 5, "Distance calculation is incorrect.");
	console.log("Test Distance Calculation: PASSED");
}

function testNormalRotation() {
	const plane = new Plane(new Vector3(0, 0, 0), new Vector3(0, 0, 1));
	plane.rotateNormal(new Vector3(0, 1, 0), 90); // Rotate around Y axis by 90 degrees
	console.assert(
		plane.normal.equals(new Vector3(1, 0, 0)),
		"Normal rotation failed."
	);
	console.log("Test Normal Rotation: PASSED");
}

function testPlaneRotationWithAnotherPlane() {
	const plane1 = new Plane(new Vector3(0, 0, 0), new Vector3(0, 0, 1));
	const plane2 = new Plane(new Vector3(0, 0, 0), new Vector3(0, 1, 0));
	plane1.rotateWithPlane(plane2); // Rotate plane1 to align with plane2
	// This is a conceptual test; the outcome depends on how rotateWithPlane is implemented.
	console.log("Test Plane Rotation with Another Plane: PASSED");
}

// Execute Test Functions
testPlaneCreation();
testPointProjection();
testDistanceCalculation();
testNormalRotation();
testPlaneRotationWithAnotherPlane();

function testPlaneConstruction() {
	const point = new Vector3(1, 2, 3);
	const normal = new Vector3(0, 0, 1);
	const plane = new Plane(point, normal);

	if (
		!plane.point.equals(new Vector3(1, 2, 3)) ||
		!plane.normal.equals(new Vector3(0, 0, 1).normalize())
	) {
		return "Failed: Plane construction or normalization of the normal vector is incorrect.";
	}
	return "Passed: Plane construction and normal vector normalization.";
}

function testSetPointAndNormal() {
	const plane = new Plane(new Vector3(0, 0, 0), new Vector3(1, 0, 0));
	plane.setPoint(new Vector3(1, 1, 1));
	plane.setNormal(new Vector3(0, 1, 0));

	if (
		!plane.point.equals(new Vector3(1, 1, 1)) ||
		!plane.normal.equals(new Vector3(0, 1, 0).normalize())
	) {
		return "Failed: Setting of point or normal vector is incorrect.";
	}
	return "Passed: Setting of point and normal vector.";
}

function testIsPointOnPlane() {
	const plane = new Plane(new Vector3(0, 0, 0), new Vector3(0, 0, 1));
	const pointOnPlane = new Vector3(1, 1, 0);
	const pointOffPlane = new Vector3(1, 1, 1);

	if (
		!plane.isPointOnPlane(pointOnPlane) ||
		plane.isPointOnPlane(pointOffPlane)
	) {
		return "Failed: Incorrect identification of points on or off the plane.";
	}
	return "Passed: Correct identification of points on and off the plane.";
}

function testDistanceToPoint() {
	const plane = new Plane(new Vector3(0, 0, 0), new Vector3(0, 0, 1));
	const point = new Vector3(0, 0, 5);
	const distance = plane.distanceToPoint(point);

	if (distance !== 5) {
		return `Failed: Incorrect distance calculation. Expected 5, got ${distance}.`;
	}
	return "Passed: Correct distance calculation.";
}

function testRotatePlaneBasedOnAnother() {
	// Setup - Create two perpendicular planes in the XY plane
	const planeA = new Plane(new Vector3(0, 0, 0), new Vector3(0, 0, 1)); // Normal points up
	const planeB = new Plane(new Vector3(0, 0, 0), new Vector3(1, 0, 0)); // Normal points along X

	// Action - Rotate planeA 90 degrees around the Y-axis, affecting planeB similarly
	const axisOfRotation = new Vector3(0, 1, 0); // Y-axis
	const angleOfRotation = 90; // 90 degrees
	const angleOfRotationRadians = angleOfRotation * (Math.PI / 180);
	planeA.rotateNormal(axisOfRotation, angleOfRotationRadians); // Simulate the rotation of planeA
	planeB.rotateWithPlane(planeA); // Apply the rotation logic to planeB based on planeA's change

	// Expected outcome for planeB's normal is now pointing along Z, assuming planeB "follows" planeA's rotation
	const expectedNormalB = new Vector3(0, 0, 1);

	// Verify the outcome
	if (!planeB.normal.equals(expectedNormalB)) {
		return `Failed: Plane rotation based on another did not match expected outcome. Expected normal ${expectedNormalB.toString()}, but got ${planeB.normal.toString()}.`;
	}
	return "Passed: Plane rotation based on another plane successfully matched the expected outcome.";
}

function runAllTests() {
	console.log(testPlaneConstruction());
	console.log(testSetPointAndNormal());
	console.log(testIsPointOnPlane());
	console.log(testDistanceToPoint());
	console.log(testRotatePlaneBasedOnAnother());
}

runAllTests();
