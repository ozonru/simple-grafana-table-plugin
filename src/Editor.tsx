import cs from 'classnames';
import React, { PureComponent } from 'react';
import { PanelEditorProps } from '@grafana/ui';

import Template from './components/ColumnTemplate';
import CommonOptions from './components/CommonOptions';
import { ColumnTemplate, Options, StatType } from './types';
import { ADD_TEMPLATE_INDEX, COMMON_OPTIONS_INDEX, TEMPLATE_INDEX } from './consts';

function createTemplate(i: number): ColumnTemplate {
  return {
    columns: [],
    delimiter: 2,
    name: `Template #${i}`,
    type: StatType.Total,
  };
}

const optionStyle = { marginRight: '7px' };

export default class Editor extends PureComponent<PanelEditorProps<Options>> {
  private handleTemplateChange = (newTemplate: ColumnTemplate) => {
    const templates = this.props.options.templates.slice();
    const i = this.props.options.activeTab;

    templates[i] = newTemplate;
    this.props.onOptionsChange({ ...this.props.options, templates });
  };

  private handleOptionChange = (options: Omit<Options, 'templates'>) => {
    this.props.onOptionsChange({
      ...this.props.options,
      hideHeaders: options.hideHeaders,
    });
  };

  private handleChangeTab = (i: number) => {
    this.props.onOptionsChange({ ...this.props.options, activeTab: i });
  };

  private toOptions = () => {
    this.handleChangeTab(COMMON_OPTIONS_INDEX);
  };

  private addColumn = () => {
    const i = this.props.options.templates.length;

    this.props.onOptionsChange({
      ...this.props.options,
      activeTab: i,
      templates: [...this.props.options.templates, createTemplate(i + 1)],
    });
  };

  private isActive(state: number) {
    return this.props.options.activeTab === state;
  }

  public render() {
    const { options } = this.props;
    const isTemplateActive = options.activeTab > -1;
    const template = options.templates[this.props.options.activeTab];

    return (
      <div className="edit-tab-with-sidemenu">
        <aside className="edit-sidemenu-aside">
          <ul className="edit-sidemenu">
            <li key={TEMPLATE_INDEX}>
              <a href="#">
                <h5 className="text-warning">
                  <i className="fa fa-gear" style={optionStyle} />
                  &nbsp; Column Templates
                </h5>
              </a>
            </li>
            {options.templates.map(({ name }, i) => (
              <li key={i} className={cs({ active: this.isActive(i) })}>
                <a onClick={() => this.handleChangeTab(i)}>{name}</a>
              </li>
            ))}
            <li key={ADD_TEMPLATE_INDEX}>
              <a className="pointer" onClick={this.addColumn}>
                <i className="fa fa-plus" />
                &nbsp; Add Template
              </a>
            </li>
            <li key={COMMON_OPTIONS_INDEX} className={cs({ active: this.isActive(COMMON_OPTIONS_INDEX) })}>
              <a onClick={this.toOptions}>
                <h5 className="text-warning">
                  <i className="fa fa-gear" style={optionStyle} />
                  &nbsp; Common Options
                </h5>
              </a>
            </li>
          </ul>
        </aside>
        {isTemplateActive ? (
          <Template key="template" template={template} onChange={this.handleTemplateChange} />
        ) : (
          <CommonOptions key="common" options={options} onChange={this.handleOptionChange} />
        )}
      </div>
    );
  }
}
