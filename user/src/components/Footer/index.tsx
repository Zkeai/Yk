import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

const Footer: React.FC = () => {
  const defaultMessage = 'LeCloud';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'blog',
          title: 'Lemon Blog',
          href: 'https://lemox.club',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/saoren',
          blankTarget: true,
        },
        {
          key: 'Utils',
          title: 'Lemon Utils',
          href: 'https://www.baidu.com',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
