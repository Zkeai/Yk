import { DefaultFooter } from '@ant-design/pro-layout';
import "./index.less"
const Footer: React.FC = () => {
  const defaultMessage = 'LeCloud';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      className={"D-footer"}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        // {
        //   key: 'blog',
        //   title: 'Lemon Blog',
        //   href: 'https://lemox.club',
        //   blankTarget: true,
        // },
        // {
        //   key: 'github',
        //   title: <GithubOutlined />,
        //   href: 'https://github.com/saoren',
        //   blankTarget: true,
        // },
        // {
        //   key: 'Utils',
        //   title: 'Lemon Utils',
        //   href: 'https://www.baidu.com',
        //   blankTarget: true,
        // },
      ]}
    />
  );
};

export default Footer;
