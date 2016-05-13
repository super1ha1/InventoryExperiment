import React from 'react';
import Overlay from './Overlay';

const styles = {
  main: {
    width: 'auto',
    minHeight: 'auto',
    borderRadius: 3,
    boxShadow: '0 2px 26px rgba(0, 0, 0, .3), 0 0 0 1px rgba(0, 0, 0, .1)',
    margin: '0 auto',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -150,
    marginTop: -150,
    marginBottom: 150,
    background: '#fff',
  },
};

function DefaultRightHeader(props) {
  return (
    <span
      style={{
        cursor: 'pointer',
      }}
      className="glyphicon glyphicon-remove-circle"
      {...props}
    ></span>
  );
}

export default function Dialog(props) {
  return (
    <div>
      <Overlay
        show={props.opened}
        dark={props.dark}
      >
        <div
          style={Object.assign({}, styles.main, props.styles ? props.styles.main : {})}
        >
          <div
            style={{
              position: 'relative',
              minHeight: 'inherit',
            }}
          >
            <div
              style={{
                background: props.headerBackgroundColor || '#f6f7f8',
                borderBottom: '1px solid #e5e5e5',
                padding: '10px 12px',
                height: '100%',
              }}
            >
            {(() => {
              if (props.headerLeft) {
                return (
                  <div>
                    <div
                      style={{
                        width: '90%',
                        float: 'left',
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 600,
                          fontSize: '137%',
                        }}
                      >
                        {props.headerLeft}
                      </span>
                    </div>
                    <div
                      style={{
                        width: '10%',
                        float: 'left',
                        textAlign: 'right',
                      }}
                    >
                      {props.headerRight || <DefaultRightHeader onClick={props.clickRightIconHandler} />}
                    </div>
                  </div>
                );
              }
              return (
                <div
                  style={{
                    width: '100%',
                    float: 'left',
                    textAlign: 'right',
                  }}
                >
                  <DefaultRightHeader onClick={props.clickRightIconHandler} />
                </div>
              );
            })()}

              <div style={{ clear: 'both' }} />

            </div>
            <div style={{ padding: '7px 13px' }}>
              {props.children}
            </div>

            {(() => {
              if (props.footerLeft || props.footerRight) {
                return (
                  <div
                    style={{
                      position: 'absolute',
                      width: '100%',
                      bottom: 0,
                      borderTop: '1px solid rgba(0, 0, 0, 0.1)',
                      padding: 13,
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        float: 'left',
                        textAlign: 'right',
                      }}
                    >
                      {props.footerRight}
                    </div>
                  </div>
                );
              }
            })()}

          </div>
        </div>
      </Overlay>
    </div>
  );
}
