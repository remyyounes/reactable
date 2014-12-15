var Td = exports.Td = React.createClass({displayName: 'Td',
  handleClick: function(e){
    if (typeof this.props.handleClick !== 'undefined') {
      return this.props.handleClick(e, this);
    }
  },
  render: function() {
    var tdProps = {
      'data-column': this.props.column.key,
      className: this.props.className,
      onClick: this.handleClick
    };

    // Attach any properties on the column to this Td object to allow things like custom event handlers
    for (var key in this.props.column) {
      if (key !== 'key' && key !== 'name') {
        tdProps[key] = this.props.column[key];
      }
    }

    var data = this.props.data;

    if (typeof(this.props.children) !== 'undefined') {
      if (isReactComponent(this.props.children)) {
        data = this.props.children;
      } else if (
        typeof(this.props.data) === 'undefined' &&
        stringable(this.props.children)
      ) {
        if (isReactComponent(this.props.children)) { console.log('child is component'); }
        data = this.props.children.toString();
      }

      if (this.props.children instanceof Unsafe) {
        tdProps.dangerouslySetInnerHTML = { __html: this.props.children.toString() };
      } else {
        tdProps.children = data;
      }
    }

    return React.DOM.td(tdProps);
  }
});
