import React from 'react';
import SelectedTourTypes from '../components/ResultsDiv/SelectedTourTypes';
import RegionsTabs from '../components/ResultsDiv/RegionsTabs';

const contentStyle ={
    resultsDiv: {
        float: "left"
    }
};

class ResultsDiv extends React.Component {

    render() {
        return (
        <div style={contentStyle.resultsDiv}>
            <SelectedTourTypes />
            <RegionsTabs />
        </div>
        );

    }
}

export default ResultsDiv;