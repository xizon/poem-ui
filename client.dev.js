import React from 'react';
import ReactDOM from 'react-dom';

//import { ModalDialog, Lightbox, Button, ButtonGroup, Tabs, TabList, TabPanel, Accordion, AccordionItem, MultilevelDropdownMenu, TableSorter, FileField, Card  } from 'poem-ui';

import { ModalDialog } from 'poem-ui/ModalDialog';
import { Lightbox } from 'poem-ui/Lightbox';
import { Button, ButtonGroup} from 'poem-ui/Button';
import { Tabs, TabList, TabPanel} from 'poem-ui/Tabs';
import { Accordion, AccordionItem} from 'poem-ui/Accordion';
import { MultilevelDropdownMenu } from 'poem-ui/MultilevelDropdownMenu';
import { TableSorter } from 'poem-ui/TableSorter';
import { FileField  } from 'poem-ui/Form';
import { Card } from 'poem-ui/Card';

ReactDOM.render(
  <>
    <div style={{padding:"100px"}}>
    <h2 className="poemui-t-c">Some Components Demo</h2>
    <hr />
    <p>
      <ButtonGroup spacing="bottom">
          <Button border="thin" background="primary transparent" corners="pill" size="small" href="https://google.com">Group</Button>
          <Button border="thin" background="primary transparent" corners="pill" size="small" href="#">Group</Button>
          <Button border="thin" background="primary transparent" corners="pill" size="small" href="#">Group</Button>
        </ButtonGroup>
        <hr />
        <Button border="thin" spacing="bottom" background="primary" corners="pill" size="medium" id="app-btn-1" href="#" data-title="button" onClick={(e) => { e.preventDefault(); alert(e.target.id); }}>Click me to view ID!</Button>

    </p>

      <hr />
      <ModalDialog
        autoOpen={false}
        triggerTagName="a"
        triggerClassName="poemui-btn poemui-btn__border--thin poemui-btn__margin--b poemui-btn__size--s poemui-btn__bg--primary"
        triggerContent={<>
          Modal Dialog
        </>}>
        <h2>Holy Crap!!!</h2>
        <p>p.s. Sorry for calling you a dingus earlier.</p><p>p.s. Sorry for calling you a dingus earlier.</p><p>p.s. Sorry for calling you a dingus earlier.</p><p>p.s. Sorry for calling you a dingus earlier.</p><p>p.s. Sorry for calling you a dingus earlier.</p><p>p.s. Sorry for calling you a dingus earlier.</p><p>p.s. Sorry for calling you a dingus earlier.</p><p>p.s. Sorry for calling you a dingus earlier.</p><p>p.s. Sorry for calling you a dingus earlier.</p>
      </ModalDialog>
      <hr />
      <Lightbox
        fixed={false}
        triggerTagName="a"
        triggerClassName="poemui-btn poemui-btn__border--thin poemui-btn__margin--b poemui-btn__size--s poemui-btn__bg--primary"
        triggerContent={<>
          Lightbox
        </>}
        htmlContent={<>
          <div className="poemui-t-l">
            <p>
              <h5>Title 2</h5>
            </p>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. <a href="https://example.com" target="_blank">This is link</a></p>

            <p>Nullam id dolor id nibh ultricies vehicula ut id elit. <a href="https://example.com" target="_blank">Curabitur blandit tempus porttitor</a>. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Donec id elit non mi porta gravida at eget metus. Vestibulum id ligula porta felis euismod semper. Super/Duper/Long/NonBreaking/Path/Name/To/A/File/That/Is/Way/Deep/Down/In/Some/Mysterious/Remote/Desolate/Part/Of/The/Operating/System/To/A/File/That/Just/So/Happens/To/Be/Strangely/Named/Supercalifragilisticexpialidocious.txt</p>
          </div>

        </>} />

        <hr />
        <Tabs>
          <TabList key="tab-list-1" defaultActive>Tab 1</TabList>
          <TabList key="tab-list-2">Tab 2</TabList>
          <TabList key="tab-list-3">Tab 3</TabList>

          <TabPanel key="tab-panel-1" defaultActive>
            <p>Hi, this is the first tab.</p>
          </TabPanel>
          <TabPanel key="tab-panel-2">
            <p>This is the 2nd tab.</p>
            <p>This is the 2nd tab.</p>
            <p>This is the 2nd tab.</p>
          </TabPanel>
          <TabPanel key="tab-panel-3">
            <p>And this is the 3rd tab.</p>
          </TabPanel>    
        </Tabs>	

        <br />
        <Accordion triggerType="click" displayTheFirstItem={true}>
        <AccordionItem title={<>Item 1</>}>
          <h4>Usage:</h4>Click on an item to open.
        </AccordionItem>
        <AccordionItem title={<>Item 2</>}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
        </AccordionItem>
        <AccordionItem title={<>Item 3</>}>
          <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac.</p>

            <p>People think focus means saying yes to the thing you&#8217;ve got to focus on. But that&#8217;s not what it means at all. It means saying no to the hundred other good ideas that there are. You have to pick carefully. I&#8217;m actually as proud of the things we haven&#8217;t done as the things I have done. Innovation is saying no to 1,000 things. <cite>Steve Jobs &#8211; Apple Worldwide Developers&#8217; Conference, 1997</cite></p>
          <p>Nullam id dolor id nibh ultricies vehicula ut id elit. Curabitur blandit tempus porttitor. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Donec id elit non mi porta gravida at eget metus. Vestibulum id ligula porta felis euismod semper.</p>
          <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac.</p>
        </AccordionItem>
        <AccordionItem title={<>Item 4</>}>
          Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
        </AccordionItem>
      </Accordion>

      <br />
      <MultilevelDropdownMenu data={[{
          title: "Top level 1",
          link: "#",
          children: [
            {
              title: "Sub level 1_1",
              link: "#",
              children: [{
                title: "Sub Sub Level 1_1",
                link: "#",
                children: [{
                  title: "Sub Sub Sub Level 1_1",
                  link: "#"
                }]
              }]
            },
            {
              title: "Sub level 1_2",
              link: "#"
            }]
        },
        {
          title: "Top level 2",
          link: "https://example.com"
        },
        {
          title: "Top level 3",
          link: "https://www.bing.com",
          children: [
            {
              title: "Sub level 3_1",
              link: "#"
            },
            {
              title: "Sub level 3_2",
              link: "#"
            },
            {
              title: "Sub level 3_3",
              link: "#"
            }]
        },
        {
          title: "Top level 4",
          link: "#",
          children: [
            {
              title: "Sub level 4_1",
              link: "#"
            },
            {
              title: "Sub level 4_2",
              link: "#"
            }]
        },
        {
          title: "Top level 5",
          link: "#"
        },
        {
          title: "Top level 6",
          link: "#"
        }
        ]} />


        <hr />
        <TableSorter horizontal={true} alternantRow={true} data={{
          "headers": [
            {"type": false, "content": "Index" },
              {"type": "number", "content": "Money" },
            {"type": "text", "content": "Name" },
            {"type": "number", "content": "No." },
            {"type": "date", "content": "Date1" },
            {"type": "date", "content": "Date2" }
          ],
          "fields": [
            [
              {"cols": 1, "content": "1" },
              {"cols": 1, "content": "$55.134" },
              {"cols": 1, "content": "David Lin" },
              {"cols": 1, "content": "3453434"},
              {"cols": 1, "content": "2012-09-25T12:10:46+00:00"},
              {"cols": 1, "content": "May 22, 2003"}
              
            ],
            [
              {"cols": 1, "content": "2" },
              {"cols": 1, "content": "$255.12" },
              {"cols": 1, "content": "Co Cheey" },
              {"cols": 1, "content": "-2324.343"},
              {"cols": 1, "content": "2013-09-10T12:10:46+00:00"},
              {"cols": 1, "content": "September 13, 2013"}
            ],	
            [
              {"cols": 1, "content": "3" },
              {"cols": 1, "content": "$21.134" },
              {"cols": 1, "content": "Foristin" },
              {"cols": 1, "content": "-34789.34"},
              {"cols": 1, "content": "2018-09-24T12:10:46+00:00"},
              {"cols": 1, "content": "January 2, 2019"}
            ],	
            [
              {"cols": 1, "content": "4" },
              {"cols": 1, "content": "$3454.134" },
              {"cols": 1, "content": "Alice" },
              {"cols": 1, "content": "+224.5"},
              {"cols": 1, "content": "2011-09-21T12:10:46+00:00"},
              {"cols": 1, "content": "December 1, 2018"}
            ],	
            [
              {"cols": 1, "content": "5" },
              {"cols": 1, "content": "$224.0" },
              {"cols": 1, "content": "Wooli" },
              {"cols": 1, "content": "+33.6"},
              {"cols": 1, "content": "2011-02-26T12:10:46+00:00"},
              {"cols": 1, "content": "July 22, 2017"}
            ],	
            [
              {"cols": 1, "content": "6" },
              {"cols": 1, "content": "$356.2" },
              {"cols": 1, "content": "Spiter Low" },
              {"cols": 1, "content": "278.23487"},
              {"cols": 1, "content": "2019-01-01T12:10:46+00:00"},
              {"cols": 1, "content": "July 28, 2017"}
            ]
            
          ]
        }} />

        <hr />
        <FileField label="Drag and drop a file here" name="file-field-name-1" />


        <hr />
        <Card type="thumb" avatar={`https://uiux.cc/wp-content/uploads/2017/01/plugin4-1.jpg`} bgConfig={null} title="Title" titleEllipsis={true} subTitle={<a href="https://uiux.cc" target="_blank">@https://uiux.cc</a>} btnIcon={<i className="icon-ellipsis-h" aria-hidden="true"></i>}>Harum, ad porro molestiae corporis natus aut non fugit. Recusandae, reprehenderit, voluptate voluptas reiciendis voluptatum tempora vero vel libero facere fuga maiores ratione eaque ad illum porro dignissimos sit eos.</Card>

    </div>

  </>,
  document.getElementById('app')
);


























