import {Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import {FC, ReactNode} from "react";

interface CustomTabsProps {
  tabs: any[];
  contents: ReactNode[];
  index: number; // Current active tab index
  onChange: (index: number) => void; // Function to handle tab changes
}

const CustomTabs: FC<CustomTabsProps> = ({tabs, contents, index, onChange}) => {
  return (
    <Tabs index={index} onChange={onChange}>
      <TabList>
        {tabs.map((tab, idx) => (
          <Tab key={idx} onClick={() => onChange(idx)}>{tab}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {contents.map((content, idx) => (
          <TabPanel key={idx}>
            {content}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default CustomTabs;