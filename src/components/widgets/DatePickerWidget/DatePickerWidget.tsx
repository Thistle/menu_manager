/*
    Wrapper for react DatePicker component
 */
import React, {Component} from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';


interface IProps {
    id: string,
    initialValue?: any,
    selected: any,
    onChange: any
}

export default class DatePickerWidget extends Component<IProps, any> {
    state: any;

    constructor(props: any) {
        super(props);
        moment.defaultFormat = 'America/Los_Angeles';
    }

    onChange = (dateString: any) => {console.log(dateString);
        let date: any = new Date(dateString).toISOString();
        this.props.onChange(this.props.id, date.substring(0, date.indexOf('T')));
    };

    render(){
        return(
            <div className={'row datepicker-wicket'}>
                <div className={'col-12'}>
                    <DatePicker onChange={this.onChange}
                                selected={(this.props.selected)? new Date(this.props.selected):null}
                                />
                </div>
            </div>
        )
    }
}