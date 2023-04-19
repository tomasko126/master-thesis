import { defineEventHandler, readBody } from 'h3';
import type { GridCommunication } from '~/functions/types/GridCommunication';
// import { Decode } from 'arraybuffer-encoding/base64/standard';

/**
 * API endpoint - POST /api/grid
 */
export default defineEventHandler(async (event) => {
  const requestBody: GridCommunication.Request.Body = await readBody(event);

  const responseBody: GridCommunication.Response.BodyData = {
    grids: [],
  };

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
