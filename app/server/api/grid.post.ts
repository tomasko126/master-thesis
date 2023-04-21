import { defineEventHandler, H3Error, readBody } from 'h3';
import type { GridCommunication } from '~/functions/types/GridCommunication';
// import { Decode } from 'arraybuffer-encoding/base64/standard';

const throwError = (message: string): never => {
  const error = new H3Error();
  error.statusCode = 400;
  error.data = message;
  throw error;
}

const validateRequest = (requestBody: GridCommunication.Request.Body): void => {
  if (!Object.hasOwn(requestBody, 'data')) {
    throwError(`Request body does not contain |data| property!`);
  }

  if (!Array.isArray(requestBody.data)) {
    throwError(`Request body's |data| property is not an array!`);
  }

  if (requestBody.data.length === 0) {
    throwError(`Request body's |data| property is empty! It must contain at least one object.`);
  }

  for (const bodyData of requestBody.data) {
    if (!Object.hasOwn(bodyData, 'image')) {
      throwError(`Property |image| is missing inside of some |data[i]| object!`);
    }

    if (typeof bodyData.image !== 'object') {
      throwError(`Property |image| inside of some |data[i]| object is not an object!`)
    }

    if (!Object.hasOwn(bodyData.image, 'imageId')) {
      throwError(`Property |imageId| is missing inside of some |data[i].image| object!`);
    }
    if (typeof bodyData.image.imageId !== 'string') {
      throwError(`|imageId| property of some |data[i].image| object is not a string!`);
    }
    if (!bodyData.image.imageId) {
      throwError(`|imageId| property of some |data[i].image| object is empty!`);
    }

    if (!Object.hasOwn(bodyData.image, 'imageData')) {
      throwError(`Property |imageData| is missing inside of some |data[i].image| object!`);
    }
    if (typeof bodyData.image.imageData !== 'string') {
      throwError(`|imageData| property inside of some |data[i].image| object is not a string!`);
    }
    if (!bodyData.image.imageData) {
      throwError(`|imageData| property inside of some |data[i].image| object is empty!`);
    }

    if (!Object.hasOwn(bodyData, 'grid')) {
      throwError(`Property |grid| is missing inside of some |data[i]| object!`);
    }

    if (typeof bodyData.grid !== 'object') {
      throwError(`Property |grid| inside of some |data[i]| object is not an object!`)
    }

    if (!Object.hasOwn(bodyData.grid, 'primaryLines')) {
      throwError(`Property |primaryLines| is missing inside of some |data[i].grid| object!`);
    }
    if (!Array.isArray(bodyData.grid.primaryLines)) {
      throwError(`Property |primaryLines| of some |data[i].grid| object is not an array!`);
    }
    if (bodyData.grid.primaryLines.length === 0) {
      throwError(`Property |primaryLines| of some |data[i].grid| object is empty!`);
    }

    for (const primaryLine of bodyData.grid.primaryLines) {
      if (!Object.hasOwn(primaryLine, 'points')) {
        throwError(`One of |data[i].grid.primaryLines[i]| does not contain |points| property!`);
      }
      if (!Array.isArray(primaryLine.points)) {
        throwError(`One of |data[i].grid.primaryLines[i]|'s |points| property is not an array!`);
      }
      if (primaryLine.points.length === 0) {
        throwError(`One of |data[i].grid.primaryLines[i]|'s |points| array is empty!`);
      }

      for (const point of primaryLine.points) {
        if (!Object.hasOwn(point, 'x')) {
          throwError(`One of points in the |data[i].grid.primaryLines[i].points| array does not contain an |x| property!`);
        }
        if (typeof point.x !== 'number') {
          throwError(`One of points in the |data[i].grid.primaryLines[i].points| array contains |x| property, which is not a number!`);
        }
        if (point.x < 0) {
          throwError(`One of points in the |data[i].grid.primaryLines[i].points| array contains |x| property, which is less than 0!`);
        }

        if (!Object.hasOwn(point, 'y')) {
          throwError(`One of points in the |data[i].grid.primaryLines[i].points| does not contain an |y| property!`);
        }
        if (typeof point.y !== 'number') {
          throwError(`One of points in the |data[i].grid.primaryLines[i].points| contains |y| property, which is not a number!`);
        }
        if (point.y < 0) {
          throwError(`One of points in the |data[i].grid.primaryLines[i].points| contains |y| property, which is less than 0!`);
        }

        if (!Object.hasOwn(point, 'isCommonPoint')) {
          throwError(`One of points in the |data[i].grid.primaryLines[i].points| does not contain an |isCommonPoint| property!`);
        }
        if (typeof point.isCommonPoint !== 'boolean') {
          throwError(`One of points in the |data[i].grid.primaryLines[i].points| contains |isCommonPoint| property, which is not a boolean!`);
        }
      }

      if (!Object.hasOwn(primaryLine, 'uuid')) {
        throwError(`One of |grid.primaryLines[i]| line does not contain an |uuid| property!`);
      }
      if (typeof primaryLine.uuid !== 'string') {
        throwError(`One of |grid.primaryLines[i]| line |uuid| property is not a string!`);
      }
      if (!primaryLine.uuid) {
        throwError(`One of |grid.primaryLines[i]| |uuid| property is empty!`);
      }
    }

    if (!Object.hasOwn(bodyData.grid, 'includesRefinementPoints')) {
      throwError(`Property |grid.includesRefinementPoints| is missing inside of some |data[i]| object!`);
    }
    if (typeof bodyData.grid.includesRefinementPoints !== 'boolean') {
      throwError(`Property |grid.includesRefinementPoints| inside of some |data[i]| object is not a boolean!`);
    }
  }

  if (!Object.hasOwn(requestBody, 'options')) {
    throwError('Request body does not contain |options| object!');
  }
  if (typeof requestBody.options !== 'object') {
    throwError(`Request body's |options| property is not an object!`);
  }

  if (!Object.hasOwn(requestBody.options, 'force')) {
    throwError(`Request body's |options| object does not contain |force| property!`);
  }
  if (typeof requestBody.options.force !== 'number') {
    throwError(`|force| property of request's body |options| object is not a number!`);
  }

  if (!Object.hasOwn(requestBody.options, 'stopTime')) {
    throwError(`Request body's |options| object does not contain |stopTime| property!`);
  }
  if (typeof requestBody.options.stopTime !== 'number') {
    throwError(`|stopTime| property of request's body |options| object is not a number!`);
  }

  if (!Object.hasOwn(requestBody.options, 'curvature')) {
    throwError(`Request body's |options| object does not contain |curvature| property!`);
  }
  if (typeof requestBody.options.curvature !== 'number') {
    throwError(`|curvature| property of request's body |options| object is not a number!`);
  }
};

/**
 * API endpoint - POST /api/grid
 */
export default defineEventHandler(async (event) => {
  const requestBody: GridCommunication.Request.Body = await readBody(event);

  const responseBody: GridCommunication.Response.BodyData = {
    grids: [],
  };

  // Validate incoming request
  validateRequest(requestBody);

  for (const frameData of requestBody.data) {
    // Image data has been anonymized and encoded to base64 because of minimizing payload to server
    // const base64ToUint64Array = Decode(frameData.image.imageData);
    const grid: GridCommunication.Response.Grid = {
      imageId: frameData.image.imageId,
      primaryLines: frameData.grid.primaryLines,
      includesRefinementPoints: frameData.grid.includesRefinementPoints,
    };
    responseBody.grids.push(grid);
  }

  return responseBody;
});
