import { css } from "@hpcc-js/wc-core";

export const accordionpanel = /*#__PURE__*/ css`
.lm-AccordionPanel .lm-AccordionPanel-title {
    box-sizing: border-box;
    padding: 0px 10px;
    background: #e5e5e5;
    border: 1px solid #c0c0c0;
    border-bottom: none;
    font: 12px Helvetica, Arial, sans-serif;
    min-height: 22px;
    max-height: 22px;
    min-width: 35px;
    line-height: 20px;
    margin: 0px;
  }
  
  .lm-AccordionPanel .lm-AccordionPanel-title:focus,
  .lm-AccordionPanel .lm-AccordionPanel-title:hover {
    background: #dbdbdb;
  }
  
  .lm-AccordionPanel .lm-AccordionPanel-title:focus,
  .lm-AccordionPanel
    .lm-AccordionPanel-title:last-of-type:focus:not(.lm-mod-expanded) {
    border: 1px solid lightskyblue;
  }
  
  .lm-AccordionPanel .lm-AccordionPanel-title:last-of-type:not(.lm-mod-expanded) {
    border-bottom: 1px solid #c0c0c0;
  }
  
  .lm-AccordionPanel
    .lm-AccordionPanel-title.lm-mod-expanded
    .lm-AccordionPanel-titleCollapser:before {
    content: '\\f0d8'; /* fa-caret-up */
    font-family: FontAwesome;
  }
  
  .lm-AccordionPanel
    .lm-AccordionPanel-title
    .lm-AccordionPanel-titleCollapser:before {
    content: '\\f0d7'; /* fa-caret-down */
    font-family: FontAwesome;
    position: absolute;
    right: 10px;
  }
  
  .lm-AccordionPanel .lm-AccordionPanel-titleLabel {
    padding: 0px 5px;
  }
  `;

export const commandpalette = /*#__PURE__*/ css`
.lm-CommandPalette {
  font-family: sans-serif;
  background: #f5f5f5;
}

.lm-CommandPalette-search {
  padding: 8px;
}

.lm-CommandPalette-wrapper {
  padding: 4px 6px;
  background: white;
  border: 1px solid #e0e0e0;
  position: relative;
}

.lm-CommandPalette-input {
  width: 92%;
  border: none;
  outline: none;
  font-size: 16px;
}

.lm-CommandPalette-header {
  padding: 4px;
  color: #757575;
  font-size: 12px;
  font-weight: 600;
  background: #e1e1e1;
  cursor: pointer;
}

.lm-CommandPalette-header:hover::before {
  content: '\\2026';
  float: right;
  margin-right: 4px;
}

.lm-CommandPalette-header > mark {
  background-color: transparent;
  font-weight: bold;
}

.lm-CommandPalette-item {
  padding: 4px 8px;
  color: #757575;
  font-size: 13px;
  font-weight: 500;
}

.lm-CommandPalette-emptyMessage {
  padding: 4px;
  color: #757575;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
}

.lm-CommandPalette-item.lm-mod-disabled {
  color: rgba(0, 0, 0, 0.25);
}

.lm-CommandPalette-item.lm-mod-active {
  background: #7fdbff;
}

.lm-CommandPalette-item:hover:not(.lm-mod-active):not(.lm-mod-disabled) {
  background: #e5e5e5;
}

.lm-CommandPalette-itemIcon {
  display: none;
}

.lm-CommandPalette-itemLabel > mark {
  background-color: transparent;
  font-weight: bold;
}

.lm-CommandPalette-item.lm-mod-disabled mark {
  color: rgba(0, 0, 0, 0.4);
}

.lm-CommandPalette-itemCaption {
  color: #9e9e9e;
  font-size: 11px;
  font-weight: 400;
}
`;

export const datagrid = /*#__PURE__*/ css`
.lm-DataGrid {
  min-width: 64px;
  min-height: 64px;
  border: 1px solid #a0a0a0;
}

.lm-DataGrid-scrollCorner {
  background-color: #f0f0f0;
}

.lm-DataGrid-scrollCorner::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 1px;
  background-color: #a0a0a0;
}

.lm-DataGrid-cellEditorOccluder {
  pointer-events: none;
  position: absolute;
  overflow: hidden;
}

.lm-DataGrid-cellEditorContainer {
  pointer-events: auto;
  position: absolute;
  background-color: #ffffff;
  box-sizing: border-box;
  box-shadow: 0px 0px 6px #006bf7;
  border: 2px solid #006bf7;
}

.lm-DataGrid-cellEditorContainer.lm-mod-invalid {
  box-shadow: 0px 0px 6px red;
  border: 2px solid red;
}

.lm-DataGrid-cellEditorContainer > form {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.lm-DataGrid-cellEditorWidget {
  width: 100%;
  height: 100%;
  outline: none;
  box-sizing: border-box;
}

.lm-DataGrid-cellEditorInput {
  background-color: #ffffff;
  border: 0;
}

.lm-DataGrid-cellEditorCheckbox {
  margin: 0;
}

.lm-DataGrid-notification {
  position: absolute;
  display: flex;
  overflow: visible;
  animation: fade-in 300ms ease-out;
}

.lm-DataGrid-notificationContainer {
  box-shadow: 0px 2px 5px #999999;
  border-radius: 3px;
  background-color: white;
  color: black;
  border: 1px solid black;
  font-family: sans-serif;
  font-size: 13px;
  padding: 4px;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
}
`;

export const dockpanel = /*#__PURE__*/ css`
.lm-DockPanel-overlay {
  background: rgba(255, 255, 255, 0.6);
  border: 1px dashed black;
  transition-property: top, left, right, bottom;
  transition-duration: 150ms;
  transition-timing-function: ease;
}
`;

export const menu = /*#__PURE__*/ css`
.lm-Menu {
  padding: 3px 0px;
  background: white;
  color: rgba(0, 0, 0, 0.87);
  border: 1px solid #c0c0c0;
  font: 12px Helvetica, Arial, sans-serif;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.2);
}

.lm-Menu-item.lm-mod-active {
  background: #e5e5e5;
}

.lm-Menu-item.lm-mod-disabled {
  color: rgba(0, 0, 0, 0.25);
}

.lm-Menu-itemIcon {
  width: 21px;
  padding: 4px 2px;
}

.lm-Menu-itemLabel {
  padding: 4px 35px 4px 2px;
}

.lm-Menu-itemMnemonic {
  text-decoration: underline;
}

.lm-Menu-itemShortcut {
  padding: 4px 0px;
}

.lm-Menu-itemSubmenuIcon {
  width: 16px;
  padding: 4px 0px;
}

.lm-Menu-item[data-type='separator'] > div {
  padding: 0;
  height: 9px;
}

.lm-Menu-item[data-type='separator'] > div::after {
  content: '';
  display: block;
  position: relative;
  top: 4px;
  border-top: 1px solid #dddddd;
}

.lm-Menu-itemIcon::before,
.lm-Menu-itemSubmenuIcon::before {
  font-family: FontAwesome;
}

.lm-Menu-item.lm-mod-toggled > .lm-Menu-itemIcon::before {
  content: '\\f00c';
}

.lm-Menu-item[data-type='submenu'] > .lm-Menu-itemSubmenuIcon::before {
  content: '\\f0da';
}
`;

export const menubar = /*#__PURE__*/ css`
.lm-MenuBar {
  padding-left: 5px;
  background: #fafafa;
  color: rgba(0, 0, 0, 0.87);
  border-bottom: 1px solid #dddddd;
  font: 13px Helvetica, Arial, sans-serif;
}

.lm-MenuBar-menu {
  transform: translateY(-1px);
}

.lm-MenuBar-item {
  padding: 4px 8px;
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
}

.lm-MenuBar-item.lm-mod-active {
  background: #e5e5e5;
}

.lm-MenuBar.lm-mod-active .lm-MenuBar-item.lm-mod-active {
  z-index: 10001;
  background: white;
  border-left: 1px solid #c0c0c0;
  border-right: 1px solid #c0c0c0;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);
}
`;

export const scrollbar = /*#__PURE__*/ css`
.lm-ScrollBar[data-orientation='horizontal'] {
  min-height: 16px;
  max-height: 16px;
  min-width: 45px;
  border-top: 1px solid #a0a0a0;
}

.lm-ScrollBar[data-orientation='vertical'] {
  min-width: 16px;
  max-width: 16px;
  min-height: 45px;
  border-left: 1px solid #a0a0a0;
}

.lm-ScrollBar-button {
  background-color: #f0f0f0;
  background-position: center center;
  min-height: 15px;
  max-height: 15px;
  min-width: 15px;
  max-width: 15px;
}

.lm-ScrollBar-button:hover {
  background-color: #dadada;
}

.lm-ScrollBar-button.lm-mod-active {
  background-color: #cdcdcd;
}

.lm-ScrollBar-track {
  background: #f0f0f0;
}

.lm-ScrollBar-thumb {
  background: #cdcdcd;
}

.lm-ScrollBar-thumb:hover {
  background: #bababa;
}

.lm-ScrollBar-thumb.lm-mod-active {
  background: #a0a0a0;
}

.lm-ScrollBar[data-orientation='horizontal'] .lm-ScrollBar-thumb {
  height: 100%;
  min-width: 15px;
  border-left: 1px solid #a0a0a0;
  border-right: 1px solid #a0a0a0;
}

.lm-ScrollBar[data-orientation='vertical'] .lm-ScrollBar-thumb {
  width: 100%;
  min-height: 15px;
  border-top: 1px solid #a0a0a0;
  border-bottom: 1px solid #a0a0a0;
}

.lm-ScrollBar[data-orientation='horizontal'] .lm-ScrollBar-button[data-action='decrement']:before {
  content: '\\f0d9';  /* fa-caret-left */
  font-family: FontAwesome;
}

.lm-ScrollBar[data-orientation='horizontal'] .lm-ScrollBar-button[data-action='increment']:before {
  content: '\\f0da';  /* fa-caret-right */
  font-family: FontAwesome;
}

.lm-ScrollBar[data-orientation='vertical'] .lm-ScrollBar-button[data-action='decrement']:before {
  content: '\\f0d8';  /* fa-caret-up */
  font-family: FontAwesome;
}

.lm-ScrollBar[data-orientation='vertical'] .lm-ScrollBar-button[data-action='increment']:before {
  content: '\\f0d7';  /* fa-caret-down */
  font-family: FontAwesome;
}
`;

export const tabbar = /*#__PURE__*/ css`
.lm-TabBar {
  min-height: 24px;
  max-height: 24px;
}

.lm-TabBar-content {
  min-width: 0;
  min-height: 0;
  align-items: flex-end;
  border-bottom: 1px solid #c0c0c0;
}

.lm-TabBar-tab {
  padding: 0px 10px;
  background: #e5e5e5;
  border: 1px solid #c0c0c0;
  border-bottom: none;
  font: 12px Helvetica, Arial, sans-serif;
  flex: 0 1 125px;
  min-height: 20px;
  max-height: 20px;
  min-width: 35px;
  margin-left: -1px;
  line-height: 20px;
}

.lm-TabBar-tabLabel .lm-TabBar-tabInput {
  padding: 0px;
  border: 0px;
  font: 12px Helvetica, Arial, sans-serif;
}

.lm-TabBar-tab.lm-mod-current {
  background: white;
}

.lm-TabBar-tab:hover:not(.lm-mod-current) {
  background: #f0f0f0;
}

.lm-TabBar-tab:first-child {
  margin-left: 0;
}

.lm-TabBar-tab.lm-mod-current {
  min-height: 23px;
  max-height: 23px;
  transform: translateY(1px);
}

.lm-TabBar-tabIcon,
.lm-TabBar-tabLabel,
.lm-TabBar-tabCloseIcon {
  display: inline-block;
}

.lm-TabBar-tab.lm-mod-closable > .lm-TabBar-tabCloseIcon {
  margin-left: 4px;
}

.lm-TabBar .lm-TabBar-addButton {
  padding: 0px 6px;
  border-bottom: 1px solid #c0c0c0;
}

.lm-TabBar-tab.lm-mod-closable > .lm-TabBar-tabCloseIcon:before {
  content: '\\f00d'; /* fa-close */
  font-family: FontAwesome;
}

.lm-TabBar .lm-TabBar-addButton:before {
  content: '\\f067'; /* fa-plus */
  font-family: FontAwesome;
}

.lm-TabBar-tab.lm-mod-drag-image {
  min-height: 23px;
  max-height: 23px;
  min-width: 125px;
  border: none;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  transform: translateX(-40%) translateY(-58%);
}
`;
