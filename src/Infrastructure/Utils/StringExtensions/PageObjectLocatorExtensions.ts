import { FrameLocator, Locator } from '@playwright/test';
import BaseDependency from '../../../Common/BasePageDependency';

export type roleType =
    | 'alert'
    | 'alertdialog'
    | 'application'
    | 'article'
    | 'banner'
    | 'blockquote'
    | 'button'
    | 'caption'
    | 'cell'
    | 'checkbox'
    | 'code'
    | 'columnheader'
    | 'combobox'
    | 'complementary'
    | 'contentinfo'
    | 'definition'
    | 'deletion'
    | 'dialog'
    | 'directory'
    | 'document'
    | 'emphasis'
    | 'feed'
    | 'figure'
    | 'form'
    | 'generic'
    | 'grid'
    | 'gridcell'
    | 'group'
    | 'heading'
    | 'img'
    | 'insertion'
    | 'link'
    | 'list'
    | 'listbox'
    | 'listitem'
    | 'log'
    | 'main'
    | 'marquee'
    | 'math'
    | 'meter'
    | 'menu'
    | 'menubar'
    | 'menuitem'
    | 'menuitemcheckbox'
    | 'menuitemradio'
    | 'navigation'
    | 'none'
    | 'note'
    | 'option'
    | 'paragraph'
    | 'presentation'
    | 'progressbar'
    | 'radio'
    | 'radiogroup'
    | 'region'
    | 'row'
    | 'rowgroup'
    | 'rowheader'
    | 'scrollbar'
    | 'search'
    | 'searchbox'
    | 'separator'
    | 'slider'
    | 'spinbutton'
    | 'status'
    | 'strong'
    | 'subscript'
    | 'superscript'
    | 'switch'
    | 'tab'
    | 'table'
    | 'tablist'
    | 'tabpanel'
    | 'term'
    | 'textbox'
    | 'time'
    | 'timer'
    | 'toolbar'
    | 'tooltip'
    | 'tree'
    | 'treegrid'
    | 'treeitem';
export type initType = 'role' | 'text' | 'label' | 'placeholder' | 'testId';

declare global {
    interface String {
        init<T extends BaseDependency>(pageObject: T, options?: Record<string, string>): Locator;
        initFrame<T extends BaseDependency>(pageObject: T): FrameLocator;
        initBy<T extends BaseDependency>(pageObject: T, initType: initType, options?: Record<string, string>): Locator;
    }
}

String.prototype.init = function <T extends BaseDependency>(pageObject: T, options?: Record<string, string>): Locator {
    const s: string = String(this);
    return pageObject.page.locator(s, options);
};

String.prototype.initFrame = function <T extends BaseDependency>(pageObject: T): FrameLocator {
    const s: string = String(this);
    return pageObject.page.frameLocator(s);
};

String.prototype.initBy = function <T extends BaseDependency>(
    pageObject: T,
    initBy: initType,
    options?: Record<string, string>,
): Locator {
    const s: string = String(this);
    switch (initBy) {
        case 'role':
            return pageObject.page.getByRole(s as roleType, options);
        case 'text':
            return pageObject.page.getByText(s, options);
        case 'label':
            return pageObject.page.getByLabel(s, options);
        case 'placeholder':
            return pageObject.page.getByPlaceholder(s, options);
        case 'testId':
            return pageObject.page.getByTestId(s);
        default:
            return pageObject.page.getByRole(s as roleType, options);
    }
};

export {};
