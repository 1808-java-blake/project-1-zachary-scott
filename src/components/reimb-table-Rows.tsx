import { Reimb } from "../models/reimb";
import * as React from "react";

interface IProps {
  reimbs: Reimb[];
}

export class ReimbTableRows extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
  }
  public render() {
    const reimbsList = this.props.reimbs.map(reimb => {
      <tr key={reimb.id}>
        <th scope="row">{reimb.amount}</th>

        <td>{reimb.submitted}</td>
        <td>{reimb.resolved}</td>
        <td>{reimb.statusId}</td>
        <td>{reimb.typeId}</td>
      </tr>;
    });
    console.log(reimbsList);
    return { reimbsList };
  }
}
