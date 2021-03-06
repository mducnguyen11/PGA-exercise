import React from 'react';
import Skeleton from 'react-loading-skeleton';
import '../PhotoCard/PhotoCard.scss';
interface Props {}

const PhotoPageSkeleton = (props: Props) => {
  return (
    <div
      style={{
        height: '100vh',
      }}
      className="photo-page-skeleton"
    >
      <div className={`photo-card`}>
        <div className="photo-card-avt">
          <Skeleton width={150} height={150} />
        </div>
        <div className="photo-card-content">
          <Skeleton className="photo-card-title" width={600} height={10} />
          <div>
            <Skeleton className="photo-card-time" width={120} height={10} />
          </div>
        </div>
      </div>
      <div className={`photo-card`}>
        <div className="photo-card-avt">
          <Skeleton width={150} height={150} />
        </div>
        <div className="photo-card-content">
          <Skeleton className="photo-card-title" width={600} height={10} />
          <div>
            <Skeleton className="photo-card-time" width={120} height={10} />
          </div>
        </div>
      </div>
      <div className={`photo-card`}>
        <div className="photo-card-avt">
          <Skeleton width={150} height={150} />
        </div>
        <div className="photo-card-content">
          <Skeleton className="photo-card-title" width={600} height={10} />
          <div>
            <Skeleton className="photo-card-time" width={120} height={10} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoPageSkeleton;
