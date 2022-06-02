export function filterBy(_filterObject: any[], args: any): any {
    if (args) {
        const _filterValues = args.filterValues;
        const _filterText = args.filterText;
        if (_filterValues && _filterValues.length > 0 && _filterText && _filterText !== '') {
            _filterObject = _filterObject.filter(function (_subscriber) {
                let _isFind = false;
                _filterValues.forEach((_filterValue) => {
                    if (
                        _subscriber[_filterValue] &&
                        _subscriber[_filterValue].toLowerCase().indexOf(_filterText.toLowerCase()) > -1
                    ) {
                        _isFind = true;
                    }
                });
                return _isFind;
            });
        }
    }
    return _filterObject;
}
