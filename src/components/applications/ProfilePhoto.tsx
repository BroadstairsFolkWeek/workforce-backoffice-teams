import { makeStyles } from "@fluentui/react-components";
import { ApplicationInfo } from "../../interfaces/application-data";

interface ProfilePhotoProps {
  application: ApplicationInfo;
  thumbnail: boolean;
}

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({
  application,
  thumbnail,
}) => {
  const classes = useStyles();

  if (!application.photo) {
    return null;
  }

  const srcUrl = thumbnail
    ? application.photo.thumbnails.medium?.url
    : application.photo.downloadUrl;

  return <img className={classes.root} src={srcUrl} alt="" loading="lazy" />;
};

export default ProfilePhoto;
