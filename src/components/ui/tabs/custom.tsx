import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const CustomTabs = ({data}) => {
  return (
    <Tabs>
      <TabList>
        {
          data.map((item, index) => <Tab key={index}>{item.title}</Tab>)
        }
      </TabList>

      {
        data.map((item, index) => (
          <TabPanel key={index}>
            {item.content}
          </TabPanel>
        ))
      }
    </Tabs>
  )
}

export default CustomTabs;
