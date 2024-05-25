'use strict';

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService(
  "api::blog.blog",
  ({ strapi }) => ({
    async findOne(slug) {
      const isId = Number.isInteger(parseInt(slug));

      const entity = await strapi.db.query("api::blog.blog").findOne({
        where: isId
          ? {
              $or: [{ slug }, { id: slug }],
            }
          : {
              slug,
            },
      });

      return entity;
    },
  })
);