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

export interface ComponentsRichtext extends Struct.ComponentSchema {
  collectionName: 'components_components_richtexts';
  info: {
    displayName: 'richtext';
    icon: 'bold';
  };
  attributes: {
    text: Schema.Attribute.RichText;
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
      'components.herobanner': ComponentsHerobanner;
      'components.richtext': ComponentsRichtext;
      'helpercomponents.navlinks': HelpercomponentsNavlinks;
    }
  }
}
