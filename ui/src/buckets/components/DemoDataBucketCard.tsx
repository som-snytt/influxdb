// Libraries
import React, {FC} from 'react'
import {withRouter, WithRouterProps} from 'react-router'

// Components
import {
  ResourceCard,
  Label,
  Alignment,
  AlignItems,
  ComponentSize,
  ComponentColor,
  ButtonShape,
  FlexDirection,
  FlexBox,
  IconFont,
} from '@influxdata/clockface'
import {Context} from 'src/clockface'

// Types
import {DemoBucket} from 'src/types'
import {deleteDemoDataBucketMembership} from 'src/cloud/actions/demodata'

interface Props {
  bucket: DemoBucket
  onRemoveBucket: typeof deleteDemoDataBucketMembership
}

const DemoDataBucketCard: FC<Props & WithRouterProps> = ({
  bucket,
  router,
  params: {orgID},
  onRemoveBucket,
}) => {
  const handleNameClick = () => {
    router.push(`/orgs/${orgID}/data-explorer?bucket=${bucket.name}`)
  }

  return (
    <ResourceCard
      testID={`bucket-card ${bucket.name}`}
      contextMenu={
        <Context align={Alignment.Center}>
          <FlexBox
            alignItems={AlignItems.Center}
            direction={FlexDirection.Row}
            margin={ComponentSize.Small}
          >
            <Context.Menu
              icon={IconFont.Trash}
              color={ComponentColor.Danger}
              shape={ButtonShape.Default}
              text="Delete Bucket"
              testID={`context-delete-menu ${bucket.name}`}
            >
              <Context.Item
                label="Confirm"
                action={onRemoveBucket}
                value={bucket.id}
                testID={`context-delete-bucket ${bucket.name}`}
              />
            </Context.Menu>
          </FlexBox>
        </Context>
      }
      name={
        <ResourceCard.Name
          testID={`bucket--card--name ${bucket.name}`}
          onClick={handleNameClick}
          name={bucket.name}
        />
      }
      metaData={[
        <span
          className="system-bucket"
          key={`system-bucket-indicator-${bucket.name}`}
        >
          Demo Data Bucket
        </span>,
        <>Retention: {bucket.readableRetention}</>,
      ]}
    >
      <Label
        id="1"
        key="1"
        name="No Cost"
        color="#757888"
        description=""
        onDelete={null}
        onClick={null}
      />
    </ResourceCard>
  )
}

export default withRouter<Props>(DemoDataBucketCard)
