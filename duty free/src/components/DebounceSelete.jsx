import { useMemo, useRef, useState } from "react";
import { Select, Spin } from "antd";
import debounce from "lodash/debounce";
import Loader from "./Loader";

const DebounceSelect = ({ allowClear, mode, fetchOptions, debounceTimeout = 800, ...props }) => {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
    const fetchRef = useRef(0);

    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            fetchRef.current += 1;  
            const fetchId = fetchRef.current;
            setOptions([]);
            setFetching(true);
            fetchOptions(value).then((newOptions) => {
                if (fetchId !== fetchRef.current) {
                    // for fetch callback order
                    return;
                }
                setOptions(newOptions);
                setFetching(false);
            });
        };
        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);

    return (
        <Select
            mode={mode}
            labelInValue
            filterOption={false}
            showSearch
            allowClear={allowClear}
            size="default"
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Loader className={"small-loader"} /> : null}
            {...props}
            options={options}
        />
    );
};

export default DebounceSelect;
