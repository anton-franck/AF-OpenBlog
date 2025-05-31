import type { Schema, Struct } from '@strapi/strapi';

export interface ComponentsHerobanner extends Struct.ComponentSchema {
  collectionName: 'components_components_herobanners';
  info: {
    displayName: 'herobanner';
    icon: 'picture';
  };
  attributes: {
    description: Schema.Attribute.Text;
    heroimage: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'components.herobanner': ComponentsHerobanner;
    }
  }
}
