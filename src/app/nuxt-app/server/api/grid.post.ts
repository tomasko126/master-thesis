import { defineEventHandler, readBody } from 'h3';
import type { GridCommunication } from '~/functions/types/GridCommunication';

export default defineEventHandler(async (event) => {
  const requestBody: GridCommunication.Request.Body = await readBody(event);

  const responseBody: GridCommunication.Response.BodyData = {
    grids: [],
  };

  for (const frameData of requestBody.data) {
    const grid: GridCommunication.Response.Grid = {
      imageId: frameData.image.imageId,
      primaryLines: frameData.grid.primaryLines,
      includesRefinementPoints: frameData.grid.includesRefinementPoints,
    };
    responseBody.grids.push(grid);
  }

  return responseBody;
});
