import type { Schema, Struct } from '@strapi/strapi';

export interface ComponentsBorder extends Struct.ComponentSchema {
  collectionName: 'components_components_borders';
  info: {
    displayName: 'border';
    icon: 'bulletList';
  };
  attributes: {};
}

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

export interface ComponentsImagebanner extends Struct.ComponentSchema {
  collectionName: 'components_components_imagebanners';
  info: {
    displayName: 'imagebanner';
    icon: 'landscape';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface ComponentsRichtext extends Struct.ComponentSchema {
  collectionName: 'components_components_richtexts';
  info: {
    displayName: 'richtext';
    icon: 'bold';
  };
  attributes: {
    text: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

export interface HelpercomponentsNavlinks extends Struct.ComponentSchema {
  collectionName: 'components_helpercomponents_navlinks';
  info: {
    displayName: 'navlinks';
    icon: 'bulletList';
  };
  attributes: {
    link: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'components.border': ComponentsBorder;
      'components.herobanner': ComponentsHerobanner;
      'components.imagebanner': ComponentsImagebanner;
      'components.richtext': ComponentsRichtext;
      'helpercomponents.navlinks': HelpercomponentsNavlinks;
    }
  }
}
