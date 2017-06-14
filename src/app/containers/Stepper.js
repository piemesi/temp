import React from 'react';
import {
    Step,
    Stepper,
    StepLabel,
    StepContent
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import TextField from 'material-ui/TextField';
import RegionSelect from '../components/RegionSelect';
import TourTypeSelect from '../components/TourTypeSelect';
import DatePeriodRanger from '../components/DatePeriodRanger';
// import ArrowDownwardIcon from 'material-ui/svg-icons/navigation/arrow-downward';
// import {green500} from 'material-ui/styles/colors';


/**
 * A contrived example using a transition between steps
 */
class VertStepperVar extends React.Component {

    state = {
        loading: false,
        finished: false,
        stepIndex: 0,
    };

    dummyAsync = (cb) => {
        this.setState({loading: true}, () => {
            this.asyncTimer = setTimeout(cb, 500);
        });
    };

    handleNext = () => {
        const {stepIndex} = this.state;
        if (!this.state.loading) {
            this.dummyAsync(() => this.setState({
                loading: false,
                stepIndex: stepIndex + 1,
                finished: stepIndex >= 2,
            }));
        }
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (!this.state.loading) {
            this.dummyAsync(() => this.setState({
                loading: false,
                stepIndex: stepIndex - 1,
            }));
        }
    };

    renderStepActions(step) {
        return (
            <div style={{margin: '12px 0'}}>
                <RaisedButton
                    label="Next"
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    onTouchTap={this.handleNext}
                    style={{marginRight: 12}}
                />
                {step > 0 && (
                    <FlatButton
                        label="Back"
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onTouchTap={this.handlePrev}
                    />
                )}
            </div>
        );
    }

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <div>
                        <RegionSelect />
                        <p>

                            Select campaign settings. Campaign settings can include your budget, network, bidding
                            options and adjustments, location targeting, campaign end date, and other settings that
                            affect an entire campaign.
                        </p>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <TourTypeSelect />
                        <p>
                            Ad group status is different than the statuses for campaigns, ads, and keywords, though the
                            statuses can affect each other. Ad groups are contained within a campaign, and each campaign
                            can
                            have one or more ad groups. Within each ad group are ads, keywords, and bids.
                        </p>
                        <p>Something something whatever cool</p>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <DatePeriodRanger />

                        <p>
                            <TextField style={{marginTop: 0}} floatingLabelText="Ad group name"/>
                            Try out different ad text to see what brings in the most customers, and learn how to
                            enhance your ads using features like ad extensions. If you run into any problems with your
                            ads, find out how to tell if they're running and how to resolve approval issues.
                        </p>
                    </div>

                );
            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }

    renderContent() {
        const {finished, stepIndex} = this.state;
        const contentStyle = {margin: '0 16px', overflow: 'hidden'};

        if (finished) {
            return (
                <div style={contentStyle}>
                    <p>
                        <a
                            href="#"
                            onClick={(event) => {
                                event.preventDefault();
                                this.setState({stepIndex: 0, finished: false});
                            }}
                        >
                            Click here
                        </a> to reset the example.
                    </p>
                </div>
            );
        }

        return (
            <div style={contentStyle}>


                <div style={{marginTop: 24, marginBottom: 12}}>
                    {/*<FlatButton*/}
                        {/*label="Back"*/}
                        {/*disabled={stepIndex === 0}*/}
                        {/*onTouchTap={this.handlePrev}*/}
                        {/*style={{marginRight: 12}}*/}
                    {/*/>*/}
                    <RaisedButton
                        label="Search"
                        disabled={stepIndex === 0}
                        primary={true}
                        onTouchTap={this.handleNext}
                        backgroundColor="#a4c639"
                     />
                </div>
            </div>
        );
    }

    render() {
        const {loading, stepIndex} = this.state;

        return (
            <div style={{maxWidth: 380, maxHeight: 400}}>
                <Stepper activeStep={stepIndex}  orientation="vertical">
                    <Step>
                        <StepLabel>Select a region</StepLabel>
                        <StepContent>
                            <div>{this.getStepContent(stepIndex)}</div>
                            {this.renderStepActions(0)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Create an ad group</StepLabel>
                        <StepContent>
                            <div>{this.getStepContent(stepIndex)}</div>
                            {this.renderStepActions(1)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Create an ad</StepLabel>
                        <StepContent>
                            <div>{this.getStepContent(stepIndex)}</div>
                            {this.renderStepActions(2)}
                        </StepContent>
                    </Step>
                </Stepper>
                <ExpandTransition loading={loading} open={true}>
                    {this.renderContent()}
                </ExpandTransition>
            </div>
        );
    }
}

export default VertStepperVar;