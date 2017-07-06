/**
 * Created by Nicholas Azar on 2017-07-01.
 */

import React, {Component} from 'react';
import {Layout} from 'antd';
import AppSteps from "./app-steps/AppSteps";
import SelectSchemaStep from "./select-schema-step/SelectSchemaStep";
import SelectConfigStep from "./select-config-step/SelectConfigStep";
import GenerateStep from "./generate-step/GenerateStep";

const {Content} = Layout;

class AppContent extends Component {

    TOTAL_NUMBER_OF_STEPS = 3;

    constructor(props) {
        super(props);
        this.state = {
            currentStep: 0
        };
    }

    onNextClick = () => {
        this.setState((prevState, props) => ({
            currentStep: prevState.currentStep + 1 % this.TOTAL_NUMBER_OF_STEPS
        }));
    };

    onPrevClick = () => {
        this.setState((prevState, props) => ({
            currentStep: prevState.currentStep - 1 % this.TOTAL_NUMBER_OF_STEPS
        }));
    };

    select_step = () => {
        switch (this.state.currentStep) {
            case 0:
                return <SelectSchemaStep onNextClick={this.onNextClick}/>;
            case 1:
                return <SelectConfigStep onNextClick={this.onNextClick} onPrevClick={this.onPrevClick}/>;
            case 2:
                return <GenerateStep/>;
            default:
                return <SelectSchemaStep onNextClick={this.onNextClick}/>;
        }
    };

    render() {
        return (
            <Content className="root-content">
                <AppSteps currentStep={this.state.currentStep}/>
                <Layout className="primary-paper">
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        {this.select_step()}
                    </Content>
                </Layout>
            </Content>
        )
    }
}

export default AppContent;