import type { Schema, Struct } from '@strapi/strapi';

export interface ComponentsAccordion extends Struct.ComponentSchema {
  collectionName: 'components_components_accordions';
  info: {
    displayName: 'accordion';
    icon: 'bulletList';
  };
  attributes: {
    AccordionContent: Schema.Attribute.Component<
      'helpercomponents.accordion-content',
      true
    >;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface ComponentsBorder extends Struct.ComponentSchema {
  collectionName: 'components_components_borders';
  info: {
    displayName: 'border';
    icon: 'bulletList';
  };
  attributes: {};
}

export interface ComponentsButton extends Struct.ComponentSchema {
  collectionName: 'components_components_buttons';
  info: {
    displayName: 'button';
    icon: 'cursor';
  };
  attributes: {
    link: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ComponentsCardsbanner extends Struct.ComponentSchema {
  collectionName: 'components_components_cardsbanners';
  info: {
    displayName: 'Cardsbanner';
    icon: 'apps';
  };
  attributes: {
    Cards: Schema.Attribute.Component<'helpercomponents.card', true>;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface ComponentsHerobanner extends Struct.ComponentSchema {
  collectionName: 'components_components_herobanners';
  info: {
    displayName: 'herobanner';
    icon: 'picture';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
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
    titlesize: Schema.Attribute.Enumeration<
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    >;
  };
}

export interface HelpercomponentsAccordionContent
  extends Struct.ComponentSchema {
  collectionName: 'components_helpercomponents_accordion_contents';
  info: {
    displayName: 'accordion-content';
    icon: 'filter';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HelpercomponentsCard extends Struct.ComponentSchema {
  collectionName: 'components_helpercomponents_cards';
  info: {
    displayName: 'Card';
    icon: 'collapse';
  };
  attributes: {
    buttonlink: Schema.Attribute.String;
    buttontitle: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
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
      'components.accordion': ComponentsAccordion;
      'components.border': ComponentsBorder;
      'components.button': ComponentsButton;
      'components.cardsbanner': ComponentsCardsbanner;
      'components.herobanner': ComponentsHerobanner;
      'components.imagebanner': ComponentsImagebanner;
      'components.richtext': ComponentsRichtext;
      'helpercomponents.accordion-content': HelpercomponentsAccordionContent;
      'helpercomponents.card': HelpercomponentsCard;
      'helpercomponents.navlinks': HelpercomponentsNavlinks;
    }
  }
}
